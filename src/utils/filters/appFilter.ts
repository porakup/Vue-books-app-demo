import { format } from "date-fns";

export default {

    currencyUsd: (val: string, curencyCode: string) => {
      let resp = '0';
      if(val){
        if(curencyCode && curencyCode.toUpperCase() === 'THB') {
          resp = (parseInt(val) / 30).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

        } else {
          resp = parseInt(val).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        }
      }
      return resp;
    },
    appDate: (val: string) => {
      let resp = ''
      if(val){
        const date = val;
        const ad = date.split('-');
        if(ad.length === 3){
          resp = format(new Date(parseInt(ad[2]), parseInt(ad[1]), parseInt(ad[0])), 'dd MMM yyyy');
        }else if(ad.length === 2) {
          resp = format(new Date(parseInt(ad[1]), parseInt(ad[0])), 'MMM yyyy');
        }else if(ad.length){
          resp = ad[0];
        }
      }else {
        resp = '-';
      }
      return resp;
    },
    shortName: (val: string) => {
      let resp = val;
      if(val){
        if(val.length >= 33) {
          resp = val.slice(0, 33)+'...';
        }
      }else {
        resp = '-';
      }
      return resp;
    },
    shortTitle: (val: string) => {
      let resp = val;
      if(val){
        if(val.length >= 22) {
          resp = val.slice(0, 22)+'...';
        }
      }else {
        resp = '-';
      }
      return resp;
    },
    shortLName: (val: string) => {
      let resp = val;
      if(val){
        if(val.length >= 50) {
          resp = val.slice(0, 45)+'...';
        }
      }else {
        resp = '-';
      }
      return resp;
    },
    shortLTitle: (val: string) => {
      let resp = val;
      if(val){
        if(val.length >= 60) {
          resp = val.slice(0, 55)+'...';
        }
      }else {
        resp = '-';
      }
      return resp;
    },
    shortDesc: (val: string) => {
      let resp = val;
      if(val){
        if(val.length >= 500) {
          resp = val.slice(0, 500)+'...';
        }
      }else {
        resp = '-';
      }
      return resp;
    }
}
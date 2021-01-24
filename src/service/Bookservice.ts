import store from '../store/index';
import Pagination from '@/types/Pagination';
import { BaseService } from './BaseService';
import Filter from '@/types/Filter';

class BookApi extends BaseService {

    constructor(){
      super()
    }

    searchBook(query: string,
               filter: Filter,
               pagination: Pagination
               ): Promise<any> {

      let url = '/'
      if(query) {
        url = url+`?q=${query}`
      }else {
        const query = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        const randomQuery = query.charAt(Math.floor(Math.random() * (query.length - 1) + 1));
        store.dispatch("setQueryAction", randomQuery);
        url = url+`?q=${randomQuery}`
      }
      if(filter.category) url = url+`&subject:${filter.category}`;          

      const params = new URLSearchParams();

      if(pagination) {
        params.append("startIndex", pagination.pageStart.toString());
        params.append("maxResults", pagination.pageSize.toString());
      }

      if(filter.isEbook !== ''){
        let filterCase;
        if(filter.isEbook === 'Y' && filter.isFree === ''){
          filterCase = 1
        }else if(filter.isEbook === 'Y' && filter.isFree === 'Y'){
          filterCase = 2
        }else if(filter.isEbook === 'Y' && filter.isFree === 'N'){
          filterCase = 3
        }
        switch(filterCase) {
          case 1: params.append("filter", 'ebooks'); 
          break;
          case 2: params.append("filter", 'free-ebooks'); 
          break;
          case 3: params.append("filter", 'paid-ebooks'); 
          break;
        }
      }
      if(filter.sort) params.append("orderBy", filter.sort);

      if(filter.printType) params.append("printType", filter.printType);

      const queryParams = {params};

      return this.get(url, queryParams);
   }


   getBookById(bookId: string) {
      return this.get(bookId);
   }

}

const BookService = new BookApi();

export default BookService
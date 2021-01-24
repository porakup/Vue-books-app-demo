import Pagination from '@/types/Pagination';
import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import Book from '../../types/Book'
import Filter from '../../types/Filter'
import Toggle from '../../types/Toggle'

export interface AppState {
    request: number;
    favoriteBookList: Array<Book>;
    errorMessage: string;
    query: string;
    filter: Filter;
    pagination: Pagination;
    toggle: Toggle;
    currentRoute: string;
  }

@Module
class AppModule extends VuexModule<AppState> {
    request = 0;
    favoriteBookList: Array<Book> = [];
    errorMessage = '';
    query = '';
    filter = {isEbook:'', isFree:'', priceRange: [0,0], lang: '', printType: '', category: '', rating: '', sort: ''};
    pagination = {pageStart:0, pageSize:10};
    toggle = {retailePrice: true, language: true, printType: true, category: true, sort: true, rating: true};
    currentRoute = '';

    get getRequest(): number {
        return this.request;
    }

    get getFavoriteBookList(): Array<Book> {
        return this.favoriteBookList;
    }

    get getErrorMessage(): string {
        return this.errorMessage;
    }

    get getQuery(): string {
        return this.query;
    }

    get getFilter(): Filter {
        return this.filter;
    }

    get getPagination(): Pagination {
        return this.pagination;
    }

    get getToggle(): any {
        return this.toggle;
    }

    get getCurrentRoute(): string {
        return this.currentRoute;
    }

    @Mutation
    addRequest() {
        this.request++;
    }

    @Mutation
    requestDone() {
        this.request = 0;
    }

    @Mutation
    addFavoriteBook(data: Book) {
        this.favoriteBookList.push(data)
    }

    @Mutation
    removeFavoriteBook(data: Book) {
        this.favoriteBookList = this.favoriteBookList.filter((b: Book) => {
            return b.id !== data.id
        });
    }

    @Mutation
    setErrorMessage(message: string) {
        this.errorMessage = message;
    }

    @Mutation
    clearErrorMessage() {
        this.errorMessage = '';
    }

    @Mutation
    setQuery(text: string) {
        this.query = text;
    }

    @Mutation
    clearQuery() {
        this.query = '';
    }

    @Mutation
    setFilter(newFilter: Filter) {
        this.filter = newFilter;
    }

    @Mutation
    clearFilter() {
        this.filter = {isEbook:'', isFree:'', priceRange: [0,0], lang: '', printType: '', category: '', rating: '', sort: ''};
    }

    @Mutation
    setPagination(newPage: Pagination) {
        this.pagination = newPage;
    }

    @Mutation
    setToggle(newToggle: Toggle) {
        this.toggle = newToggle;
    }

    @Mutation
    setCurrentRoute(newRoute: string) {
        this.currentRoute = newRoute;
    }

    @Action
    async addRequestAction() {
        this.context.commit("addRequest");
    }

    @Action
    async requestDoneAction() {
        this.context.commit("requestDone");
    }

    @Action
    async addFavoriteBookAction(data: Book) {
        this.context.commit("addFavoriteBook", data);
    }

    @Action
    async removeFavoriteBookAction(data: Book) {
        this.context.commit("removeFavoriteBook", data);
    }

    @Action
    async setErrorMessageAction(message: string) {
        this.context.commit("setErrorMessage", message);
    }

    @Action
    async clearErrorMessageAction() {
        this.context.commit("clearErrorMessage");
    }

    @Action
    async setQueryAction(query: string) {
        this.context.commit("setQuery", query);
    }

    @Action
    async clearQueryAction() {
        this.context.commit("clearQuery");
    }

    @Action
    async setFilterAction(filter: Filter) {
        this.context.commit("setFilter", filter);
    }

    @Action
    async clearFilterAction() {
        this.context.commit("clearFilter");
    }

    @Action
    async setPaginationAction(page: Pagination) {
        this.context.commit("setPagination", page);
    }

    @Action
    async setToggleAction(toggle: Toggle) {
        this.context.commit("setToggle", toggle);
    }

    @Action
    async setCurrentRouteAction(route: string) {
        this.context.commit("setCurrentRoute", route);
    }
}

export default AppModule
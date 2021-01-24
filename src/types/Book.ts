export default interface Book {
        id: string;
        title: string;
        authors: Array<string>;
        publisher: string;
        publisedDate: Date;
        description: string;
        image: string;
        thumbnail: string;
        printType: string;
        pageCount: number;
        categories: Array<string>;
        industryIdentifiers: Array<any>;
        averageRating: number;
        votes: number;
        language: string;
        isEbook: boolean;
        isFree: boolean;
        retailPrice: number;
        path: string;
        currencyCode: string;
        isbn: string;
    }
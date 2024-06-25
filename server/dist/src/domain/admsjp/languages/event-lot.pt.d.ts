declare const pt: {
    eventLot: {
        create: {
            keyAlreadyExists: string;
        };
        find: {
            notFound: string;
        };
        sales: {
            'remaining-qty-not-enough': string;
            'sold-out': string;
        };
    };
};
export default pt;

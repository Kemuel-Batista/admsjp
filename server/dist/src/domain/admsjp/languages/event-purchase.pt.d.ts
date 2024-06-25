declare const pt: {
    eventPurchase: {
        find: {
            notFound: string;
            incorrectAssociation: string;
        };
        delete: {
            timeNotExpired: string;
        };
    };
};
export default pt;

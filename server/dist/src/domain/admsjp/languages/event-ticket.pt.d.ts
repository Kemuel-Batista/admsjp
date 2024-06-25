declare const pt: {
    eventTicket: {
        create: {
            keyAlreadyExists: string;
        };
        find: {
            notFound: string;
            incorrectAssociation: string;
        };
    };
};
export default pt;

declare const pt: {
    eventAddress: {
        create: {
            invalidAttachmentType: string;
            keyAlreadyExists: string;
        };
        find: {
            notFound: string;
            incorrectAssociation: string;
        };
        update: {
            keyAlreadyExists: string;
            value: string;
        };
    };
};
export default pt;

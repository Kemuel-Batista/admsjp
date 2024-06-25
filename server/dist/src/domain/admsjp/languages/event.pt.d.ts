declare const pt: {
    event: {
        create: {
            invalidAttachmentType: string;
            keyAlreadyExists: string;
        };
        find: {
            notFound: string;
            invalidStatus: string;
            disable: string;
            invalidEventType: string;
        };
        update: {
            keyAlreadyExists: string;
            value: string;
        };
        delete: {
            hasAssociations: string;
        };
    };
};
export default pt;

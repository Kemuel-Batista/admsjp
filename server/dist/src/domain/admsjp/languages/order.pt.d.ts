declare const pt: {
    order: {
        create: {
            invalidAttachmentType: string;
        };
        find: {
            notFound: string;
        };
        payment: {
            ticketOwnerIsNotSame: string;
            alreadyCompleted: string;
        };
    };
};
export default pt;

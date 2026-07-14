import { SPFI } from "@pnp/sp";

import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/site-users";


export interface ISubject {
    Id: number;
    Subject: string;
    SME?: {
        Id: number;
        Title: string;
        EMail: string;
    };
    IsActive: boolean;
}

export default class BpclContactUsServices {

    private _sp: SPFI;

    constructor(sp: SPFI) {
        this._sp = sp;
    }

    /**
     * Get Active Subjects from Master List
     */
    public async getContactSubjects(): Promise<ISubject[]> {

        try {

            const items = await this._sp.web.lists
                .getByTitle("Corp_SL_Contact_US_SME")
                .items
                .select(
                    "Id",
                    "Subject",
                    "SME/Id",
                    "SME/Title",
                    "SME/EMail",
                    "IsActive"
                )
                .expand("SME")
                .filter("IsActive eq 1")
                .orderBy("Subject", true)();

            return items as ISubject[];

        } catch (error) {

            console.error("Error while loading Contact Subjects :", error);
            throw error;

        }
    }


    public async saveContactQuery(
        subjectId: number,
        smeId: number,
        comments: string
    ): Promise<void> {

        try {

            await this._sp.web.lists
                .getByTitle("Corp_SL_Contact_US")
                .items.add({

                    SubjectId: subjectId,
                    SMEId: smeId,
                    CommentsByUser: comments,
                    Status: "Submitted"

                });

        } catch (error) {

            console.error("Error while saving Contact Query:", error);
            throw error;

        }
    }
}
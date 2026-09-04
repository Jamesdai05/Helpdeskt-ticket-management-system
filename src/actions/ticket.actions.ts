'use server';

export async function createTicket(prevState: { success: boolean, message: string; }, formdata: FormData): Promise<{success:boolean,message:string}> {
    const subject = formdata.get("subject") as string;
    const description = formdata.get("description") as string;
    const priority = formdata.get("priority") as string;

    console.log(subject, description, priority);

    return { success: true, message: "Data created!" };
}
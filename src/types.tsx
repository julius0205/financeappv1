export type AccesToken = {
    access: string,
    access_expires: number,
    refresh: string,
    refresh_expires: number,
}

export type Bank = {
    bic: string,
    id: string,
    logo: string,
    name: string,
    transaction_total_days: number,
}

export type AccessBank = {
    account_selection: boolean,
    agreement: string,
    created: string,
    id: string,
    institution_id: string,
    link: string,
    redirect: string,
    redirect_immediate: boolean,
    reference: string,
    status: string,
    user_language: string,
}
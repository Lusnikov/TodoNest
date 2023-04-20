import { ClientUserData } from "types/types"

export type SignInResponse = Promise<{
    accessToken: string,
    userData: ClientUserData 
}>
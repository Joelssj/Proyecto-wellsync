export interface TwilioRepository {
    sendMessage(to: string, message: string): Promise<void>;
}

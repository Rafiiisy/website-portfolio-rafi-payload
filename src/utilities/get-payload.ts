import config from "@payload-config";
import { getPayload as getPayloadClient } from "payload";

export const getPayload = async () => getPayloadClient({ config });

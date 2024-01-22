
import { db } from "../db";

import { eq } from "drizzle-orm";


import { getServerSession } from "next-auth/next"
import { authOptions } from "./authOptions";
import { tenants } from "../db/schema";

export async function getTenantData() {
    const session = await getServerSession(authOptions);


    const currentUserTenantId = session?.user.tenantId;
    console.log('currentUserTenantId', currentUserTenantId)
    // Check if the session exists and has user data with tenantId
    if (!session || !session.user || !session.user.tenantId) {
        console.log("Session or tenant ID not found");
        return null;
    }
    if (!tenants || !tenants.tenantId) {
        console.log("tenant ID not found");
        return null;
    }





    const data = await db.query.tenants.findFirst({
        where: eq(tenants.tenantId, currentUserTenantId),

    });

    return data
}


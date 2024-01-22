import { getTenantData } from "@/lib/utils/getTenantData"



export  default async function TenantName() {
    const tenantData = await getTenantData();
    const tenantName = tenantData?.tenantBusinessName;

  return (
    <p>
      {tenantName}
    </p>
  )
}


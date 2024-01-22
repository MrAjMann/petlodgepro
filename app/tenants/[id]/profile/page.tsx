import { and, eq } from "drizzle-orm";
import TenantProfile from "./form";
import { users } from "@/lib/db/schema";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/utils/authOptions";

type Props = {
	params: {
		id: string;
	};
};

const UserProfilePage = async ({ params }: Props) => {
	const session = await getServerSession(authOptions);
	const res = await db
		.select()
		.from(users)
		.where(and(eq(users.tenantId, params.id), eq(users.id, session?.user.id)));

	const user = res[0];
	// console.log(user);
	if (params.id === user?.tenantId || user) {
		if (user.role === "CLIENT") {
			return (
				<div>
					<div>
						<div>
							<h1 className='text-4xl text-primary-foreground '>
								{user?.firstName}'s Profile
							</h1>
						</div>
						<div className='seperator'></div>

						<TenantProfile user={user} />
					</div>
				</div>
			);
		} else if (user.role === "STAFF") {
			return (
				<div>
					<div>
						<h1>Staff View</h1>
						<TenantProfile user={user} />
					</div>
				</div>
			);
		}
	}
};
export default UserProfilePage;

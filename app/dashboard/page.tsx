type Props = {};
const DashboardPage = (props: Props) => {
  return (
    <div className="px-4 ">
      <h1 className="text-2xl flex items-center font-bold text-primary-foreground">
        Dashboard
      </h1>
      <div className="text-primary-foreground px-4 my-2">
        <p>Anthony: PetLodgePro</p>
        <p>Role: Super Admin</p>
      </div>
    </div>
  );
};
export default DashboardPage;

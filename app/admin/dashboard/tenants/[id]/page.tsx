type Props = {
  params: {
    id: string;
  };
};
const page = ({ params }: Props) => {
  return <div>Tenant name is: {params.id}</div>;
};
export default page;

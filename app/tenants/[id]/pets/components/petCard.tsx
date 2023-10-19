import Image from "next/image";

import { PetType, pets } from "@/lib/db/schema";

import DropDownMenu from "./dropDownMenu";

export default async function PetCard({ data }: { data: PetType[] }) {
  return (
    <div className="flex w-full bg-white rounded-lg inset-1 shadow-sm shadow-slate-500   max-w-7xl">
      {data.map((pet) => (
        <div
          key={pet.id}
          className="flex w-full bg-white rounded-lg ring-1 py-4 "
        >
          <div className="w-full mx-8 flex justify-evenly">
            <div>
              <div className="flex items-center gap-4 relative">
                <Image
                  width={96}
                  height={96}
                  alt=""
                  className="rounded-full p-[2px] ring-1 ring-blue-500 "
                  src={
                    "http://carolefosterartist.com.au/wp-content/uploads/2018/09/IMG_3969.jpg"
                  }
                />
                <div className="flex flex-col">
                  <div className="flex">
                    <p className="text-black text-2xl">{pet.petName}</p>
                    <p className="text-white text-lg bg-blue-400 p-1 rounded-lg ">
                      Male
                    </p>
                  </div>
                  <p className="text-foreground/60">{pet.petBreed}</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col pt-5">
              <p className="text-foreground/60">Species</p>
              <p className="text-black text-2xl">{pet.petType}</p>
            </div>
            <div className="flex flex-col pt-5">
              <p className="text-foreground/60">Age</p>
              <p className="text-black text-2xl">{pet.petAge}</p>
            </div>
            <div className="flex flex-col pt-5">
              <p className="text-foreground/60">Temperament</p>
              <p className="text-black text-2xl">{pet.petTemperament}</p>
            </div>
            <div className="flex flex-col pt-5">
              <p className="text-foreground/60">Medications</p>
              <p className="text-black text-2xl">{pet.petMedicalConditions}</p>
            </div>
            <div className="flex flex-col pt-7">
              {/* <Link
                href={`/pets/${pet.id}/edit`}
                className="rounded-lg flex flex-col justify-center items-center align-middle px-3 py-3 bg-gray-700 max-w-[100px] text-gray-100 font-semibold"
              >
                <Edit className="w-6 h-6" />
              </Link> */}
              <DropDownMenu />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

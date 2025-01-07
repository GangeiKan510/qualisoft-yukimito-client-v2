import Image from "next/image";

function BoardingRequirements() {
  return (
    <div className="px-4 lg:mx-52 border-t border-dashed">
      <div className="pt-10">
        <div className="flex flex-col text-center">
          <div className="font-semibold mb-2">Pet Boarding Requirements</div>
          <div className="text-4xl lg:text-[64px] font-bold">
            <div className="text-secondary">We are invested in making</div>
            <div className="leading-tight">an incredible place.</div>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-10 my-10">
          {[
            {
              title: "Updated Vet Vaccine Cards",
              description:
                "Our staff are highly trained to care for your pets, ensuring they are treated with love and professionalism while you are away.",
              imgSrc: "/svg/check.svg",
            },
            {
              title: "Recent Tick and Flea Treatment",
              description:
                "We carefully monitor and manage your pet's medication and vaccines, providing peace of mind while they stay with us.",
              imgSrc: "/svg/check.svg",
            },
            {
              title: "Bath or Clean Pets",
              description:
                "Each pet is unique, and we tailor our care to meet their individual needs, ensuring they are happy and comfortable during their stay.",
              imgSrc: "/svg/check.svg",
            },
            {
              title: "1 Diaper per Day/Stay",
              description:
                "Each pet is unique, and we tailor our care to meet their individual needs, ensuring they are happy and comfortable during their stay.",
              imgSrc: "/svg/check.svg",
            },
          ].map((card, index) => (
            <div
              key={index}
              className="w-full max-w-[300px] h-[325px] bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200 flex flex-col justify-between"
            >
              <div className="flex flex-col items-center justify-center py-6 bg-gray-100">
                <Image
                  width={50}
                  height={50}
                  src={card.imgSrc}
                  alt="check-icon"
                />
              </div>
              <div className="text-center text-[20px] lg:text-[24px] font-semibold mt-4 px-4">
                {card.title}
              </div>
              <div className="px-6 py-4 text-center text-sm lg:text-base text-gray-600 flex-grow">
                {card.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BoardingRequirements;

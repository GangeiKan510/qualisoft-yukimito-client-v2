import React from "react";

function PricingTable() {
  return (
    <div className="px-4 lg:mx-52 border-t border-dashed">
      <div className="overflow-x-auto py-10">
        <div className="flex flex-col text-center">
          <div className="font-semibold mb-2">Our Rates and Services</div>
          <div className="text-4xl lg:text-[64px] font-bold">
            <div className="text-secondary">Choose The Best</div>
            <div className="leading-tight">For Your Pet</div>
          </div>
        </div>
        <table className="min-w-full border border-black">
          <thead>
            <tr>
              <th className="border border-black p-2 text-left">
                Boarding Type
              </th>
              <th className="border border-black p-2 text-left">Duration</th>
              <th className="border border-black p-2 text-left">Amount</th>
              <th className="border border-black p-2 text-left">Pet Sizes</th>
              <th className="border border-black p-2 text-left">Notes</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-black p-2">Errands Service</td>
              <td className="border border-black p-2">1-4 hours</td>
              <td className="border border-black p-2">175.00</td>
              <td className="border border-black p-2">Small & Medium</td>
              <td className="border border-black p-2">Last pick up 7:00 pm</td>
            </tr>
            <tr>
              <td className="border border-black p-2"></td>
              <td className="border border-black p-2">1-4 hours</td>
              <td className="border border-black p-2">200.00</td>
              <td className="border border-black p-2">Large & X-Large</td>
              <td className="border border-black p-2"></td>
            </tr>
            <tr>
              <td className="border border-black p-2">Day Care Service</td>
              <td className="border border-black p-2">5-10 hours</td>
              <td className="border border-black p-2">250.00</td>
              <td className="border border-black p-2">Small & Medium</td>
              <td className="border border-black p-2">Last pick up 7:00 pm</td>
            </tr>
            <tr>
              <td className="border border-black p-2"></td>
              <td className="border border-black p-2">5-10 hours</td>
              <td className="border border-black p-2">275.00</td>
              <td className="border border-black p-2">Large & X-Large</td>
              <td className="border border-black p-2"></td>
            </tr>
            <tr>
              <td className="border border-black p-2" rowSpan={5}>
                Home Care (Per Night)
              </td>
              <td className="border border-black p-2">Check-In</td>
              <td className="border border-black p-2">425.00</td>
              <td className="border border-black p-2">X-Small</td>
              <td className="border border-black p-2"></td>
            </tr>
            <tr>
              <td className="border border-black p-2">12 noon</td>
              <td className="border border-black p-2">475.00</td>
              <td className="border border-black p-2">Small</td>
              <td className="border border-black p-2"></td>
            </tr>
            <tr>
              <td className="border border-black p-2">----</td>
              <td className="border border-black p-2">525.00</td>
              <td className="border border-black p-2">Medium</td>
              <td className="border border-black p-2"></td>
            </tr>
            <tr>
              <td className="border border-black p-2">Check-Out</td>
              <td className="border border-black p-2">575.00</td>
              <td className="border border-black p-2">Large</td>
              <td className="border border-black p-2"></td>
            </tr>
            <tr>
              <td className="border border-black p-2">11:00 am</td>
              <td className="border border-black p-2">650.00</td>
              <td className="border border-black p-2">X-Large</td>
              <td className="border border-black p-2">
                Last Check-Out 7:00 pm
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td
                colSpan={2}
                className="border border-black p-2 text-center text-sm"
              >
                P50/hour fee for late check out or pick up
              </td>
              <td
                colSpan={2}
                className="border border-black p-2 text-center text-sm"
              >
                After 9 pm, Home Care rate is applied, No more late fees
              </td>
              <td
                colSpan={1}
                className="border border-black p-2 text-center text-sm"
              >
                XXL size pets, see staff for pricing
              </td>
            </tr>
            <tr>
              <td
                colSpan={5}
                className="border border-black p-2 text-center text-sm"
              >
                Rate is subject to change without prior notice
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

export default PricingTable;

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tax } from "@prisma/client";
import Modal from "../ui/model";
import TaxForm from "../Product/TaxForm";
import { Plus } from "lucide-react";
import { SelectType } from "@/types/orderType";

const TaxModel = ({
  edit = false,
  tax,
  setTax
}: {
  edit?: boolean;
  tax?: Tax;
  setTax: (tax:SelectType) =>void
}) => {
  const [openModel, setOpenModel] = useState(false);

  return (
    <>
      <Modal open={openModel} onOpenChange={setOpenModel}>
        {edit ? (
          <Modal.Button asChild>
            <div
              onClick={() => setOpenModel(true)} // Ensure it toggles open state
              className="cursor-pointer text-sm  
               hover:bg-gray-100 p-2 rounded-md"
            >
              Edit
            </div>
          </Modal.Button >
        ) : (
          <Modal.Button>
            <Button onClick={() => setOpenModel(true)} variant={'secondary'}>


            <div className="flex cursor-pointer  text-indigo-500 hover:text-indigo-700">
                <Plus className="mr-2 h-4 w-4 " />
                Add a Tax
                </div>
            </Button>
          </Modal.Button>
        )}

        {openModel && (
          <Modal.Content title={edit ? "Edit Tax" : "Add Tax"}>
            <TaxForm tax={tax ?? undefined} edit={edit} setTax={setTax}/>
          </Modal.Content>
        )}
      </Modal>
    </>
  );
};

export default TaxModel;

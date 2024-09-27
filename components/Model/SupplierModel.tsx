"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Supplier } from "@prisma/client";
import Modal from "../ui/model";
import SupplierForm from "../supplier/SupplierForm";

const SupplierModel = ({
  edit = false,
  supplier,
}: {
  edit?: boolean;
  supplier?: Supplier;
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
          </Modal.Button>
        ) : (
          <Modal.Button>
            <Button onClick={() => setOpenModel(true)}>Add Supplier</Button>
          </Modal.Button>
        )}

        {openModel && (
          <Modal.Content title={edit ? "Edit Supplier" : "Add Supplier"}>
            <SupplierForm supplier={supplier ?? undefined} edit={edit} />
          </Modal.Content>
        )}
      </Modal>
    </>
  );
};

export default SupplierModel;

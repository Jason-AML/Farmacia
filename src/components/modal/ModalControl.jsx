import { useState } from "react";

export const ModalControl = ({ action, children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      <button
        className={`btn bg-amber-500 text-white  lg:flex items-center gap-2 px-5 py-2.5  text-xs font-bold uppercase tracking-widest rounded-lg transition-transform hover:scale-105`}
        onClick={() => setIsModalOpen(true)}
      >
        {action}
      </button>

      {isModalOpen && (
        <div className="modal modal-open z-100">
          <div className="h-screen w-screen flex justify-center overflow-scroll ">
            {children({ closeModal })}
          </div>

          <div className="modal-backdrop" onClick={closeModal} />
        </div>
      )}
    </div>
  );
};

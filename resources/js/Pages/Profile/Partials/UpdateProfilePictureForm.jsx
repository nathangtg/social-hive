// import { useRef, useState } from "react";
// import SecondaryButton from "@/Components/SecondaryButton";
// import DangerButton from "@/Components/DangerButton";
// import Modal from "@/Components/Modal";
// import { useForm } from "@inertiajs/react";

// export default function UploadProfilePictureForm({ className = "" }) {
//     const [showModal, setShowModal] = useState(false);
//     const fileInput = useRef();

//     const { setData, post, processing, errors } = useForm({
//         profile_picture: null,
//     });

//     const openModal = () => setShowModal(true);
//     const closeModal = () => setShowModal(false);

//     const submit = (e) => {
//         e.preventDefault();
//         post(route("profile.update"), {
//             transform: (data) => {
//                 const formData = new FormData();
//                 formData.append("profile_picture", data.profile_picture);
//                 return formData;
//             },
//             forceFormData: true,
//             onSuccess: () => closeModal(),
//         });
//     };

//     const onFileChange = (event) => {
//         setData("profile_picture", event.target.files[0] || null);
//     };

//     return (
//         <div className={className}>
//             <SecondaryButton onClick={openModal}>
//                 Upload New Profile Picture
//             </SecondaryButton>

//             <Modal show={showModal} onClose={closeModal}>
//                 <form onSubmit={(event) => submit(event)} className="p-6">
//                     <h2 className="text-lg font-medium text-gray-900">
//                         Upload New Profile Picture
//                     </h2>
//                     <p className="mt-1 text-sm text-gray-600">
//                         Choose a profile picture to upload.
//                     </p>

//                     <div className="mt-6">
//                         <input
//                             type="file"
//                             ref={fileInput}
//                             onChange={onFileChange}
//                             className="mt-1 block w-full"
//                         />
//                         {errors.profile_picture && (
//                             <p className="mt-2 text-red-600">
//                                 {errors.profile_picture}
//                             </p>
//                         )}
//                     </div>

//                     <div className="mt-6 flex justify-end">
//                         <SecondaryButton onClick={closeModal}>
//                             Cancel
//                         </SecondaryButton>

//                         <DangerButton
//                             className="ms-3"
//                             disabled={processing}
//                             type="submit"
//                         >
//                             Upload Picture
//                         </DangerButton>
//                     </div>
//                 </form>
//             </Modal>
//         </div>
//     );
// }

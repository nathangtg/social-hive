import { useRef, useState } from "react";
import SecondaryButton from "@/Components/SecondaryButton";
import DangerButton from "@/Components/DangerButton";
import Modal from "@/Components/Modal";
import { useForm } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";

export default function UploadProfilePictureForm({ className = "" }) {
    const [showModal, setShowModal] = useState(false);
    const [uploadSuccess, setUploadSuccess] = useState(false); // New state for tracking upload success
    const fileInput = useRef();

    const { setData, post, processing, errors } = useForm({
        profile_picture: null,
    });

    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    const submit = (e) => {
        e.preventDefault();
        post(route("profile.addProfilePicture"), {
            transform: (data) => {
                const formData = new FormData();
                formData.append("profile_picture_path", data.profile_picture);
                return formData;
            },
            forceFormData: true,
            onSuccess: () => {
                closeModal();
                setUploadSuccess(true); // Update state on successful upload
            },
        });
    };

    const onFileChange = (event) => {
        setData("profile_picture_path", event.target.files[0] || null);
    };

    return (
        <div className={className}>
            <h2 className="text-lg font-medium text-gray-900">
                Upload your profile picture
            </h2>
            <p className="mt-1 text-sm text-gray-600 mb-4">
                Help your friends identify you easily by adding your profile
                picture ;{")"}
            </p>

            {uploadSuccess && (
                <p className="text-green-600">
                    Profile picture uploaded successfully!
                </p>
            )}
            <PrimaryButton onClick={openModal}>
                Upload New Profile Picture
            </PrimaryButton>

            <Modal show={showModal} onClose={closeModal}>
                <form onSubmit={(event) => submit(event)} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        Upload New Profile Picture
                    </h2>
                    <p className="mt-1 text-sm text-gray-600">
                        Choose a profile picture to upload.
                    </p>

                    <div className="mt-6">
                        <input
                            type="file"
                            name="profile_picture_path"
                            ref={fileInput}
                            onChange={onFileChange}
                            className="mt-1 block w-full"
                        />
                        {errors.profile_picture && (
                            <p className="mt-2 text-red-600">
                                {errors.profile_picture}
                            </p>
                        )}
                    </div>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>
                            Cancel
                        </SecondaryButton>

                        <DangerButton
                            className="ms-3"
                            disabled={processing}
                            type="submit"
                        >
                            Upload Picture
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </div>
    );
}

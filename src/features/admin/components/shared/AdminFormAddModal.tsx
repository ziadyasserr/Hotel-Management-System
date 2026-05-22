import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../../../constants/urls/Urls";
import { ADMIN_URLS } from "../../../../constants/urls/urls";
import Select from "react-select";
import { toast } from "sonner";

type Field = {
  name: string;
  label: string;
  type: string;
};

interface Props {
  isOpen: boolean;
  onClose: () => void;
  endpoint: string;
  fields: Field[];
  onSuccess: () => void;
  defaultValues?: any;
  isEdit?: boolean;
  title: string;
}

function AdminFormAddModal({
  isOpen,
  onClose,
  endpoint,
  title,
  fields,
  onSuccess,
  defaultValues,
  isEdit = false,
}: Props) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [facilitiesList, setFacilitiesList] = useState<any[]>([]);
  const [roomsList, setRoomsList] = useState<any[]>([]);

  // ================= GET FACILITIES =================
  useEffect(() => {
    axiosInstance
      .get(ADMIN_URLS.GET_FACILITIES)
      .then((res) => {
        setFacilitiesList(res.data?.data?.facilities || []);
      })
      .catch((err) => console.log(err));
  }, []);

  // ================= GET ROOMS =================
  useEffect(() => {
    axiosInstance
      .get(ADMIN_URLS.GET_ROOMS)
      .then((res) => {
        setRoomsList(res.data?.data?.rooms || []);
      })
      .catch((err) => console.log(err));
  }, []);

  // ================= DEFAULT VALUES =================
  useEffect(() => {
    if (defaultValues) {
      Object.keys(defaultValues).forEach((key) => {
        setValue(key, defaultValues[key]);
      });
    }
  }, [defaultValues, setValue]);

  if (!isOpen) return null;

  // ================= SUBMIT =================
  const onSubmit = async (data: any) => {
    setLoading(true);

    try {
      delete data._id;

      const hasImages = Object.keys(data).includes("imgs");

      // ================= ROOMS / FACILITIES =================
      if (hasImages) {
        const formData = new FormData();

        Object.keys(data).forEach((key) => {
          const value = data[key];

          // IMAGES
          if (key === "imgs") {
            if (value?.length) {
              Array.from(value).forEach((file: any) => {
                formData.append("imgs", file);
              });
            }
          }

          // FACILITIES
          else if (key === "facilities" && Array.isArray(value)) {
            value.forEach((id: string) => {
              formData.append("facilities", id);
            });
          }

          // NORMAL FIELDS
          else {
            if (value !== undefined && value !== null) {
              formData.append(key, value);
            }
          }
        });

        if (isEdit) {
          await axiosInstance.put(endpoint, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
        } else {
          await axiosInstance.post(endpoint, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
        }
      }

      // ================= ADS / NO IMAGES =================
      else {
        if (isEdit) {
          await axiosInstance.put(endpoint, data);
        } else {
          await axiosInstance.post(endpoint, data);
        }
      }

      toast.success(
        isEdit ? "Updated Successfully" : "Added Successfully"
      );

      onSuccess();
      reset();
      onClose();
    } catch (err: any) {
      console.log(err.response?.data || err.message);
      toast.error(err?.response?.data?.message||"Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // ================= UI =================
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-[90%] max-w-lg rounded-xl p-6 shadow-lg">

        <h2 className="text-xl font-semibold mb-4">
          {isEdit ? "Update" : `Add New ${title}`}
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >

          {fields.map((field) => (
            <div key={field.name}>

              <label className="text-sm text-gray-600 mb-1 block">
                {field.label}
              </label>

              {/* ================= FACILITIES ================= */}
              {field.name === "facilities" ? (
                <Select
                  isMulti
                  options={facilitiesList.map((f: any) => ({
                    value: f._id,
                    label: f.name,
                  }))}

                  defaultValue={
                    facilitiesList
                      .filter((f: any) =>
                        defaultValues?.facilities?.includes(f._id)
                      )
                      .map((f: any) => ({
                        value: f._id,
                        label: f.name,
                      }))
                  }

                  onChange={(selected: any) => {
                    setValue(
                      "facilities",
                      selected.map((item: any) => item.value)
                    );
                  }}

                  className="text-sm"
                  classNamePrefix="select"
                />
              )

                /* ================= ROOM SELECT ================= */
                : field.name === "room" ? (
                  <Select
                    options={roomsList.map((room: any) => ({
                      value: room._id,
                      label: `Room ${room.roomNumber}`,
                    }))}

                    onChange={(selected: any) => {
                      setValue("room", selected?.value);
                    }}

                    className="text-sm"
                    classNamePrefix="select"
                  />
                )

                  /* ================= BOOLEAN SELECT ================= */
                  : field.name === "isActive" ? (
                    <select
                      {...register("isActive", {
                        required: "Status is required",
                      })}
                      className="border px-3 py-2 rounded w-full"
                    >
                      <option value="">Select Status</option>
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                    </select>
                  )

                    /* ================= INPUTS ================= */
                    : (
                      <>
                        <input
                          type={field.type}

                          {...register(field.name, {
                            required:
                              field.name === "imgs" && isEdit
                                ? false
                                : `${field.label} is required`,
                          })}

                          className="border px-3 py-2 rounded w-full"
                        />

                        {/* ERROR */}
                        {errors[field.name] && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors[field.name]?.message as string}
                          </p>
                        )}
                      </>
                    )}

            </div>
          ))}

          {/* ================= ACTIONS ================= */}
          <div className="flex justify-end gap-3 mt-4">

            <button
              type="button"
              onClick={() => {
                reset();
                onClose();
              }}
              className="bg-gray-200 px-4 py-2 rounded cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="bg-[var(--color-adminMainColor)] text-white px-4 py-2 rounded cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading
                ? "Saving..."
                : isEdit
                  ? "Update"
                  : "Save"}
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}

export default AdminFormAddModal;
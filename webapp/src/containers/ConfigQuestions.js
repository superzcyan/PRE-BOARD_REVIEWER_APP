import React, { Fragment, useRef, useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { ref as dRef, onValue, set, update } from "firebase/database";
import { ref as sRef, uploadBytes, getDownloadURL } from "firebase/storage";

import { getDB } from "../firebase"; //getDatabase
import { getStrge } from "../firebase"; //getStorage
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Ripple } from "primereact/ripple";
import { Dropdown } from "primereact/dropdown";
import { classNames } from "primereact/utils";
import { Toolbar } from "primereact/toolbar";
import { Toast } from "primereact/toast";
import "primeicons/primeicons.css";
import "primereact/resources/themes/saga-orange/theme.css";
import "primereact/resources/primereact.css";
import { useRecoilValue } from "recoil";
import { defQuestion } from "./atoms";
import { Dialog, Transition } from "@headlessui/react";
import DeleteModal from "./DeleteModal";
import ConfirmModal from "./ConfirmModal";
import PrimaryButton from "../components/PrimaryButton";

const ConfigQuestions = () => {
  const cancelButtonRef = useRef(null);
  const [questionsData, setQuestionsData] = useState([]);
  const [newQuestion, setNewQuestion] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState([]);
  const [expandedRows, setExpandedRows] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const defaultQuestion = useRecoilValue(defQuestion);
  const {
    register,
    control,
    watch,
    formState: { errors, isDirty },
    handleSubmit,
    setValue,
    reset,
  } = useForm(!isEdit && { defaultValues: defaultQuestion });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "choices",
  });
  const watchFieldArray = watch("choices");
  const controlledFields = fields.map((field, index) => {
    return {
      ...field,
      ...watchFieldArray[index],
    };
  });

  //states for dialog
  const [isDialog, setIsDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [openConfirmDialog, setConfirmDialog] = useState(false);
  const toast = useRef(null);
  //states for pagination
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageInputTooltip, setPageInputTooltip] = useState(
    "Press 'Enter' key to go to this page."
  );

  //read data from database
  useEffect(() => {
    onValue(dRef(getDB), (snapshot) => {
      const data = snapshot.val();
      if (data !== null) {
        Object.values(data).forEach((question) => {
          //console.log("question,", question);
          question.forEach((q) => {
            q.choices.forEach((choice) => {
              if (choice.image) {
                getDownloadURL(sRef(getStrge, choice.image))
                  .then((url) => {
                    // This can be downloaded directly:
                    const xhr = new XMLHttpRequest();
                    xhr.responseType = "blob";
                    xhr.onload = (event) => {
                      const blob = xhr.response;
                      // console.log("blobs", blob);
                    };
                    xhr.open("GET", url);
                    xhr.send();

                    // Or inserted into an <img> element
                    // const img = document.getElementById("myimg");
                    // img.setAttribute("src", url);
                  })
                  .catch((error) => {
                    // Handle any errors
                  });
                //CONTINUE DISPLAY BLOB-TO BE FOLLOW
              }
            });
          });
          setQuestionsData(question.filter((x) => x.question !== undefined));
        });
      }
    });
  }, []);

  //TABLE COMPONENTS
  const onCustomPage = (event) => {
    setFirst(event.first);
    setRows(event.rows);
    setCurrentPage(event.page + 1);
  };
  const paginatorTemplate = {
    layout:
      "PrevPageLink PageLinks NextPageLink RowsPerPageDropdown CurrentPageReport",
    PrevPageLink: (options) => {
      return (
        <button
          type="button"
          className={options.className}
          onClick={options.onClick}
          disabled={options.disabled}
        >
          <span className="p-3">Previous</span>
          <Ripple />
        </button>
      );
    },
    NextPageLink: (options) => {
      return (
        <button
          type="button"
          className={options.className}
          onClick={options.onClick}
          disabled={options.disabled}
        >
          <span className="p-3">Next</span>
          <Ripple />
        </button>
      );
    },
    PageLinks: (options) => {
      if (
        (options.view.startPage === options.page &&
          options.view.startPage !== 0) ||
        (options.view.endPage === options.page &&
          options.page + 1 !== options.totalPages)
      ) {
        const className = classNames(options.className, { "p-disabled": true });

        return (
          <span className={className} style={{ userSelect: "none" }}>
            ...
          </span>
        );
      }

      return (
        <button
          type="button"
          className={options.className}
          onClick={options.onClick}
        >
          {options.page + 1}
          <Ripple />
        </button>
      );
    },
    RowsPerPageDropdown: (options) => {
      const dropdownOptions = [
        { label: 10, value: 10 },
        { label: 20, value: 20 },
        { label: 50, value: 50 },
        { label: "All", value: options.totalRecords },
      ];

      return (
        <Dropdown
          className="text-xs"
          value={options.value}
          options={dropdownOptions}
          onChange={options.onChange}
        />
      );
    },
    CurrentPageReport: (options) => {
      return (
        <span
          className="mx-3"
          style={{ color: "var(--text-color)", userSelect: "none" }}
        >
          Go to {"  "}
          <InputText
            className="text-xs w-10"
            value={currentPage}
            tooltip={pageInputTooltip}
            onKeyDown={(e) => onPageInputKeyDown(e, options)}
            onChange={onPageInputChange}
          />
        </span>
      );
    },
  };
  const onPageInputKeyDown = (event, options) => {
    if (event.key === "Enter") {
      const page = parseInt(currentPage);
      if (page < 1 || page > options.totalPages) {
        setPageInputTooltip(
          `Value must be between 1 and ${options.totalPages}.`
        );
      } else {
        const first = currentPage ? options.rows * (page - 1) : 0;

        setFirst(first);
        setPageInputTooltip("Press 'Enter' key to go to this page.");
      }
    }
  };
  const onPageInputChange = (event) => {
    setCurrentPage(event.target.value);
  };
  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        <div className="flex space-x-2">
          <button
            className="flex flex-row justify-between items-center rounded bg-green-800 hover:bg-green-700 py-2 px-2.5 text-sm text-white"
            onClick={openNew}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            New
          </button>
          <button
            className={`flex flex-row justify-between rounded items-center ${
              selectedQuestion && selectedQuestion.length > 0
                ? "bg-red-700 hover:bg-red-600 "
                : "bg-gray-300"
            } py-2 px-2.5 text-sm text-white`}
            onClick={confirmDeleteSelected}
            disabled={!selectedQuestion || !selectedQuestion.length}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
            Delete
          </button>
        </div>
      </React.Fragment>
    );
  };
  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <div className="px-2">
          <button
            className="flex flex-row justify-between rounded bg-blue-500 py-2 px-2.5 text-sm text-white"
            onClick={() => editQuestion(rowData)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
            Edit
          </button>
        </div>
      </React.Fragment>
    );
  };

  //DIALOG COMPONENTS
  const openNew = () => {
    setIsDialog(true);
  };
  const confirmDeleteSelected = () => {
    setDeleteDialog(true);
  };
  const editQuestion = (question) => {
    setIsEdit(true);
    setIsDialog(true);
    //set the value to be edit
    const defaultValues = {};
    defaultValues.question = question.question;
    defaultValues.choices = question.choices;
    defaultValues.answer = question.answer;
    defaultValues.id = question.id;
    reset({ ...defaultValues });
  };

  //handle the save button of question form
  const onSubmit = (data) => {
    if (isEdit) {
      console.log("onSubmit", "if");
      //check if there is changes
      if (isDirty) {
        //sets edited question data for saving
        setNewQuestion(data);
        //calls the save function
        setConfirmDialog(true);
      } else {
        resetForm();
        setIsDialog(false);
        toast.current.show({
          severity: "info",
          summary: "Edit Stem",
          detail: "No changes made",
          life: 3000,
        });
      }
    } else {
      //get the latset id of questions
      const newQuestionId = questionsData[questionsData.length - 1].id + 1;

      //add choice id to each choices
      const choices = data.choices.map((x, index) => {
        return { ...x, choiceId: index + 1 };
      });
      //get the correct choice
      const answerId = choices
        .filter((x) => x.isCorrect === true)
        .map((choice) => choice.choiceId)[0];

      //modify data from for for additional fields before saving to db
      const newQuestionData = {
        ...data,
        choices: choices,
        answer: answerId,
        id: newQuestionId,
      };

      //rename images before saving
      const withRenamedImages = newQuestionData.choices.map((choice) => {
        if (choice.image.length > 0) {
          const renamed = new File(
            [choice.image[0]],
            "img_" + newQuestionData.id + choice.choiceId + ".jpg",
            { type: "image/jpeg" }
          );
          const imgName = "img_" + newQuestionData.id + choice.choiceId;
          return { ...choice, imageFile: renamed, image: imgName };
        } else {
          return { ...choice, imageFile: "", image: "" };
        }
      });

      //modify data from for for additional fields before saving to db
      const finalQuestionData = {
        ...newQuestionData,
        choices: withRenamedImages,
      };

      //calls the save function
      setNewQuestion(finalQuestionData);
      setConfirmDialog(true);
    }
  };
  //function for saving/updating new question to database
  const saveQuestions = () => {
    setConfirmDialog(false);
    if (isEdit) {
      //Save edited question to database
      update(dRef(getDB, "Questions/" + newQuestion.id), newQuestion)
        .then(() => {
          resetForm();
          setIsEdit(false);
          setIsDialog(false);
          toast.current.show({
            severity: "success",
            summary: "Successful",
            detail: "Stem has been updated",
            life: 3000,
          });
        })
        .catch((error) => {
          toast.current.show({
            severity: "error",
            summary: "Failed",
            detail: "Failed to add new question",
            life: 3000,
          });
        });
    } else {
      //Save new question to database
      set(dRef(getDB, "Questions/" + newQuestion.id), newQuestion)
        .then(() => {
          //Save any image 'file' comes from the Blob or File API
          newQuestion.choices.forEach((choice) => {
            if (choice.imageFile) {
              const storageRef = sRef(getStrge, choice.image); //creates ref for saving files

              uploadBytes(storageRef, choice.imageFile)
                .then((snapshot) => {})
                .catch((error) => {
                  toast.current.show({
                    severity: "error",
                    summary: "Failed",
                    detail: "Failed to save image as choice",
                    life: 3000,
                  });
                });
            }
          });
          resetForm();
          setIsDialog(false);
          toast.current.show({
            severity: "success",
            summary: "Successful",
            detail: "New question has been added",
            life: 3000,
          });
        })
        .catch((error) => {
          toast.current.show({
            severity: "error",
            summary: "Failed",
            detail: "Failed to add new question",
            life: 3000,
          });
        });
    }
  };
  const deleteQuestion = () => {
    setDeleteDialog(false);
    set(dRef(getDB, "Questions/" + selectedQuestion[0].id), null)
      .then(() => {
        setSelectedQuestion();
        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "Stem/s has been deleted",
          life: 3000,
        });
      })
      .catch(() => {
        toast.current.show({
          severity: "error",
          summary: "Failed",
          detail: "Failed to delete question/s",
          life: 3000,
        });
      });
  };
  const cancelForm = () => {
    setIsEdit(false);
    setNewQuestion();
    setIsDialog(false);
    setSelectedQuestion();
    resetForm();
  };
  const resetForm = () => {
    //reset the form values
    const defaultValues = {};
    defaultValues.question = "";
    defaultValues.choices = [{ choice: "", description: "", isCorrect: false }];
    reset(defaultValues);
  };

  const isCorrectBodyTemplate = (rowData) => {
    return (
      <span
        className={`${
          rowData.isCorrect ? "bg-cyan-300 rounded-sm p-1 px-3" : "p-1 px-3"
        }`}
      >
        {rowData.isCorrect ? "True" : "False"}
      </span>
    );
  };
  //component for expanded rows
  const rowExpansionTemplate = (data) => {
    return (
      <DataTable className="md:mx-20" value={data.choices}>
        <Column
          field="choiceId"
          header="Choice Id"
          style={{ width: "10%" }}
        ></Column>
        <Column
          field="choice"
          header="Choice"
          style={{ width: "40%" }}
        ></Column>
        <Column
          field="description"
          header="Description"
          style={{ width: "40%" }}
        ></Column>
        <Column
          field="isCorrect"
          header="Answer"
          body={isCorrectBodyTemplate}
        ></Column>
      </DataTable>
    );
  };
  //display the table for questions
  return (
    <div className="px-2 sm:px-12 py-4 sm:py-8 drop-shadow-lg">
      <Toast ref={toast} />
      <Toolbar className="mb-4" left={leftToolbarTemplate}></Toolbar>
      <DataTable
        value={questionsData}
        responsiveLayout="stack"
        breakpoint="960px"
        expandedRows={expandedRows}
        onRowToggle={(e) => setExpandedRows(e.data)}
        rowExpansionTemplate={rowExpansionTemplate}
        size="small"
        selectionMode="checkbox"
        selection={selectedQuestion}
        onSelectionChange={(e) => setSelectedQuestion(e.value)}
        paginator
        paginatorTemplate={paginatorTemplate}
        first={first}
        rows={rows}
        onPage={onCustomPage}
      >
        <Column selectionMode="multiple" headerStyle={{ width: "2%" }}></Column>
        <Column expander style={{ width: "2%" }} />
        {/* <Column field="id" header="Id" style={{ width: "5%" }} /> */}
        <Column field="question" style={{ width: "90%" }} />
        {/* <Column field="answer" header="Answer" style={{ width: "5%" }} /> */}
        <Column body={actionBodyTemplate} exportable={false}></Column>
      </DataTable>

      {/* Question Form */}
      <Transition.Root show={isDialog} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={() => setIsDialog(true)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-100"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-full p-4 text-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-100"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel
                  className="w-full md:w-11/12 bg-white rounded-md overflow-hidden shadow-xl transform transition-all
                 sm:my-8 "
                >
                  <div className="bg-white">
                    <div className="w-full">
                      <Dialog.Title
                        as="h3"
                        className="text-lg hr font-bold text-gray-900 p-4"
                      >
                        Stem Form
                      </Dialog.Title>
                      <div className="flex flex-col sm:pt-8 sm:px-12 px-4">
                        <form
                          onSubmit={handleSubmit(onSubmit)}
                          className="p-fluid w-full text-sm"
                        >
                          <div className="">
                            <label className="flex justify-start">Stem :</label>
                            <textarea
                              {...register("question", {
                                required: true,
                                message: "Stem is required",
                              })}
                              className="block w-full px-3 py-1.5 text-sm font-normal text-gray-700
                                      bg-white border border-gray-300 rounded-sm hover:border-yellow-300 
                                      focus:text-gray-700 focus:bg-white focus:border-2 focus:border-yellow-300 focus:outline-none"
                              rows="3"
                              placeholder=" Type your stem here"
                            ></textarea>

                            {errors.question &&
                              errors.question.type === "required" && (
                                <span className="text-red-500 italic">
                                  Stem must not be blank
                                </span>
                              )}
                          </div>
                          <div className="field">
                            <div className="flex items-start justify-end py-2">
                              <div className="">
                                <PrimaryButton
                                  type="button"
                                  buttonText="Add Choice"
                                  onClick={() =>
                                    append({
                                      choice: "",
                                    })
                                  }
                                />
                              </div>
                            </div>
                            <div className="space-y-1">
                              {controlledFields.map((field, index) => {
                                return (
                                  <div
                                    key={field.id}
                                    className="bg-gray-50 p-2 rounded-md"
                                  >
                                    <div className="space-y-1">
                                      <div className="flex flex-row items-center space-x-1">
                                        <div className="flex items-center text-xs min-w-max md:w-2/12">
                                          Correct :
                                        </div>
                                        <div className="flex items-center w-full md:px-1">
                                          <input
                                            type="checkbox"
                                            className="h-5 w-5"
                                            {...register(
                                              `choices.${index}.isCorrect`
                                            )}
                                          />
                                        </div>
                                        <div className="flex items-center">
                                          <button
                                            className="rounded-full"
                                            type="button"
                                            onClick={() => remove(index)}
                                          >
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              className="h-7 w-7 p-1 stroke-gray-700 rounded-full bg-gray-200 hover:bg-gray-300"
                                              fill="none"
                                              viewBox="0 0 24 24"
                                              strokeWidth={2}
                                            >
                                              <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M6 18L18 6M6 6l12 12"
                                              />
                                            </svg>
                                          </button>
                                        </div>
                                      </div>
                                      <div className="md:flex md:flex-row items-center space-x-1 md:pr-4">
                                        <div className="flex items-center text-xs md:w-2/12 ">
                                          Choice :
                                        </div>
                                        <div className="flex items-center w-full">
                                          <input
                                            className="w-full h-7 border border-gray-400 hover:border-yellow-300 rounded-sm md:h-8 px-1 focus:border-2 focus:outline-none focus:border-yellow-300"
                                            {...register(
                                              `choices.${index}.choice`
                                            )}
                                          />
                                        </div>
                                      </div>
                                      <div className="md:flex md:flex-row items-center space-x-1 md:pr-4">
                                        <div className="flex items-center text-xs md:w-2/12 ">
                                          Description :
                                        </div>
                                        <div className="flex items-center w-full">
                                          <input
                                            className="w-full h-7 border border-gray-400 hover:border-yellow-300 rounded-sm md:h-8 px-1 focus:border-2 focus:outline-none focus:border-yellow-300"
                                            {...register(
                                              `choices.${index}.description`
                                            )}
                                          />
                                        </div>
                                      </div>

                                      <div className="justify-end text-xs space-y-1">
                                        <div className="flex justify-start items-center">
                                          <input
                                            className=""
                                            type="file"
                                            {...register(
                                              `choices.${[index]}.image`
                                            )}
                                            id="choiceImage"
                                            accept="image/jpeg"
                                          />
                                          {field.image && field.image[0] && (
                                            <button
                                              className="rounded-full"
                                              type="button"
                                              onClick={() =>
                                                setValue(
                                                  `choices.${[index]}.image`,
                                                  ""
                                                )
                                              }
                                            >
                                              <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-7 w-7 p-1 stroke-gray-700 rounded-full bg-gray-200 hover:bg-gray-300"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={2}
                                              >
                                                <path
                                                  strokeLinecap="round"
                                                  strokeLinejoin="round"
                                                  d="M6 18L18 6M6 6l12 12"
                                                />
                                              </svg>
                                            </button>
                                          )}
                                        </div>
                                        <div className="flex justify-start">
                                          {!field.image && (
                                            <div className="italic text-xs text-red-500">
                                              <span className="not-italic text-xs font-semibold	text-red-500">
                                                Note:
                                              </span>{" "}
                                              .jpg format only
                                            </div>
                                          )}
                                          {field.image && field.image[0] && (
                                            <img
                                              alt="choice"
                                              className={
                                                "object-contain max-h-20 max-w-20"
                                              }
                                              src={
                                                field.image &&
                                                field.image[0] &&
                                                URL.createObjectURL(
                                                  field.image[0]
                                                )
                                              }
                                            />
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                            <div className="py-4 sm:flex sm:flex-row-reverse">
                              <button
                                type="submit"
                                className="w-full inline-flex justify-center rounded border border-transparent shadow-sm px-12 py-2 
                                bg-green-800 text-base font-medium text-white shadow-md hover:bg-green-700 hover:shadow-lg 
                                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 sm:ml-3 sm:w-auto sm:text-sm"
                              >
                                SAVE
                              </button>
                              <button
                                type="button"
                                className="mt-3 w-full inline-flex justify-center rounded border border-gray-300 shadow-sm px-8 py-2 bg-white text-base font-medium text-gray-600 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                onClick={() => cancelForm()}
                                ref={cancelButtonRef}
                              >
                                CANCEL
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      <ConfirmModal
        openConfirmDialog={openConfirmDialog}
        setConfirmDialog={setConfirmDialog}
        confirmSave={saveQuestions}
      />
      <DeleteModal
        deleteDialog={deleteDialog}
        setDeleteDialog={setDeleteDialog}
        confirmDelete={deleteQuestion}
      />
    </div>
  );
};

export default ConfigQuestions;
//CONTINUE RENAME DISPLAY IMAGE THEN UPLOAD TO STORAGE THEN DISPLAY IN QUESTIONS

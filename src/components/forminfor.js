import {
  Input,
  Button,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useColorMode,
  useColorModeValue,
  useDisclosure,
  useToast,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  FormControl,
  FormErrorMessage,
  Select,
  InputRightElement,
  InputGroup,
  color,
  Text,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { nanoid } from "nanoid";
import { useState, useRef, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addInfor, editInfor } from "../features/bookInforSlice";
import { validate } from "../validateform/validateform";
import Bookinfor from "./bookinfor";

function Forminfor() {
  const cancelRef = useRef();
  const dispatch = useDispatch();
  // send action
  const books = useSelector((state) => state.bookinfor.books);
  // Get the value in state slice
  const Overlay = () => (
    <ModalOverlay
      bg="blackAlpha.300"
      backdropFilter="blur(10px) hue-rotate(90deg)"
    />
  );
  // Make background blur when we use modal
  const toast = useToast();
  // alert component
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();
  // 3 const the above make modal open
  const [overlay, setOverlay] = useState(<Overlay />);
  const [booking, setBooking] = useState({
    name: "",
    author: "",
    genre: "",
    pages: "",
    language: "",
    country: "",
    publishDate: "",
    id: "",
  });
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState("");
  const handldeSubmit = (e) => {
    e.preventDefault();
    if (
      !values.name &&
      !values.author &&
      !values.country &&
      !values.genre &&
      !values.language &&
      !values.publishDate &&
      !values.pages
    ) {
      toast({
        title: "Added not successfully",
        position: "top-right",
        description: "You may not fulfill the form",
        status: "warning",
        isClosable: true,
      });
    } else if (editing) {
      setOverlay(<Overlay />);
      onEditOpen();
    } else {
      setLoading(!loading);
    }
  };
  // Add info and edit
  useLayoutEffect(() => {
    if (!loading && !editing) {
    } else {
      if (editing) {
        onEditClose();
        const animation = setTimeout(() => {
          setLoading(false);
          resetForm();
          onClose();
          dispatch(
            editInfor({
              name: values.name || booking.name,
              author: values.author || booking.author,
              genre: values.genre || booking.genre,
              pages: values.pages || booking.pages,
              language: values.language || booking.language,
              country: values.country || booking.country,
              publishDate: values.publishDate || booking.publishDate,
              id: editing,
            })
          );
          toast({
            title: "Edited Success",
            position: "top-right",
            description: "Your book information has been edited successfully",
            status: "success",
            isClosable: true,
          });
          setBooking({
            name: "",
            author: "",
            genre: "",
            pages: "",
            language: "",
            country: "",
            publishDate: "",
          });
          setEditing("");
        }, 500);
        return () => clearTimeout(animation);
      } else {
        const animation = setTimeout(() => {
          setLoading(false);
          resetForm();
          onClose();
          dispatch(
            addInfor({
              name: values.name,
              author: values.author,
              genre: values.genre,
              pages: values.pages,
              language: values.language,
              country: values.country,
              publishDate: values.publishDate,
              time: new Date().toISOString(),
              id: nanoid(),
            })
          );
          toast({
            title: "Added Success",
            position: "top-right",
            description: "Your book information has been added",
            status: "success",
            isClosable: true,
          });
        }, 500);
        return () => clearTimeout(animation);
      }
    }
  }, [loading]);

  // A little animation spinner button
  const {
    resetForm,
    handleChange,
    handleSubmit,
    touched,
    errors,
    handleBlur,
    values,
  } = useFormik({
    initialValues: booking,
    validationSchema: validate,
    onSubmit: { handldeSubmit },
  });
  // Formik validation
  const colors = useColorModeValue("#FFFFFF", "#000000");
  const titleColor = useColorModeValue("#442C2E", "#FF7597");
  const backgrounds = useColorModeValue("#6200EE", "#BB86FC");
  const formBgColor = useColorModeValue("#FFFFFF", "RGBA(0, 0, 0, 0.89)");
  const formTextColor = useColorModeValue(
    "#000000",
    "RGBA(255, 255, 255, 0.87)"
  );
  const { toggleColorMode } = useColorMode();
  // Dark mode
  return (
    <div className="mt-10">
      <Button
        marginLeft="4%"
        rounded={"full"}
        _hover={
          titleColor !== "#442C2E"
            ? {
                background: "#B794F4",
              }
            : {
                background: "RGBA(98, 0, 238, 0.92)",
              }
        }
        boxShadow={
          "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px"
        }
        background={backgrounds}
        color={colors}
        onClick={toggleColorMode}
      >
        {titleColor === "#442C2E" ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        )}
        DARKMODE
      </Button>
      <>
        <AlertDialog
          motionPreset="slideInBottom"
          leastDestructiveRef={cancelRef}
          onClose={onEditClose}
          isOpen={isEditOpen}
          isCentered
        >
          <AlertDialogOverlay />
          <AlertDialogContent>
            <AlertDialogHeader>Book information change?</AlertDialogHeader>
            <AlertDialogCloseButton />
            <AlertDialogBody>
              Are you certain ? Your book information will change after this
              step
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button
                ref={cancelRef}
                onClick={() => {
                  resetForm();
                  onEditClose();
                }}
                colorScheme="red"
              >
                No
              </Button>
              <Button
                colorScheme="green"
                onClick={() => {
                  setLoading(!loading);
                }}
                ml={3}
              >
                Yes
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </>
      <div className="w-1/2 text-right m-auto">
        <Text color={titleColor} className="text-4xl uppercase font-bold">
          WELCOME TO BOOK MANAGEMENT,
        </Text>
        <Text color={titleColor} className="text-4xl uppercase font-bold">
          PIN YOUR FAVORATE BOOKS
        </Text>
        <Button
          mt={"10"}
          rounded={"full"}
          boxShadow={
            "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;"
          }
          background={backgrounds}
          color={colors}
          _hover={
            titleColor !== "#442C2E"
              ? {
                  background: "#B794F4",
                }
              : {
                  background: "RGBA(98, 0, 238, 0.92)",
                }
          }
          onClick={() => {
            setOverlay(<Overlay />);
            onOpen();
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>{" "}
          ADD BOOK
        </Button>
      </div>
      <div>
        <Modal
          isOpen={isOpen}
          onClose={() => {
            resetForm();
            onClose();
            setBooking({
              name: "",
              author: "",
              genre: "",
              pages: "",
              language: "",
              country: "",
              publishDate: "",
            });
          }}
        >
          {overlay}
          <ModalContent
            background={formBgColor}
            color={formTextColor}
            w="50%"
            m="auto"
          >
            <ModalCloseButton
              className="rounded-lg p-1 hover:bg-slate-200 "
              ml="auto"
            />
            <ModalHeader
              fontSize="2rem"
              textAlign="left"
              textTransform={"uppercase"}
            >
              Put down your books information
            </ModalHeader>
            <form
              onSubmit={handleSubmit}
              className="w-full max-w-lg dark:text-white "
            >
              <ModalBody mt={4}>
                <div className="flex flex-wrap -mx-3 mb-6">
                  <FormControl isInvalid={!!errors.name && touched.name}>
                    <div className="w-full px-3">
                      <FormLabel fontSize={"xs"} textTransform={"uppercase"}>
                        {" "}
                        Book tittle
                      </FormLabel>
                      <Input
                        backgroundColor={
                          titleColor !== "#442C2E"
                            ? "RGBA(255, 255, 255, 0.16)"
                            : "gray.200"
                        }
                        focusBorderColor={
                          titleColor !== "#442C2E"
                            ? "RGBA(255, 255, 255, 0.28)"
                            : "rgba(0, 0, 0, 0.35)"
                        }
                        _focus={
                          titleColor !== "#442C2E"
                            ? { background: "RGBA(255, 255, 255, 0.18)" }
                            : { background: "white" }
                        }
                        id="name"
                        type="text"
                        placeholder={`${
                          booking.name ? booking.name : "les miserables"
                        }`}
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <FormErrorMessage>{errors.name}</FormErrorMessage>
                    </div>
                  </FormControl>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                  <FormControl isInvalid={!!errors.author && touched.author}>
                    <div className="w-full px-3">
                      <FormLabel fontSize={"xs"} textTransform={"uppercase"}>
                        {" "}
                        Author
                      </FormLabel>
                      <Input
                        backgroundColor={
                          titleColor !== "#442C2E"
                            ? "RGBA(255, 255, 255, 0.16)"
                            : "gray.200"
                        }
                        focusBorderColor={
                          titleColor !== "#442C2E"
                            ? "RGBA(255, 255, 255, 0.28)"
                            : "rgba(0, 0, 0, 0.35)"
                        }
                        _focus={
                          titleColor !== "#442C2E"
                            ? { background: "RGBA(255, 255, 255, 0.18)" }
                            : { background: "white" }
                        }
                        id="author"
                        type="text"
                        placeholder={`${
                          booking.author ? booking.author : "Victor Hugo"
                        }`}
                        value={values.author}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <FormErrorMessage>{errors.author}</FormErrorMessage>
                    </div>
                  </FormControl>
                </div>
                <div className="flex -mx-3 mb-6">
                  <FormControl isInvalid={!!errors.genre && touched.genre}>
                    <div className="w-full px-3">
                      <FormLabel fontSize={"xs"} textTransform={"uppercase"}>
                        {" "}
                        Genre
                      </FormLabel>
                      <Input
                        backgroundColor={
                          titleColor !== "#442C2E"
                            ? "RGBA(255, 255, 255, 0.16)"
                            : "gray.200"
                        }
                        focusBorderColor={
                          titleColor !== "#442C2E"
                            ? "RGBA(255, 255, 255, 0.28)"
                            : "rgba(0, 0, 0, 0.35)"
                        }
                        _focus={
                          titleColor !== "#442C2E"
                            ? { background: "RGBA(255, 255, 255, 0.18)" }
                            : { background: "white" }
                        }
                        id="genre"
                        type="text"
                        placeholder={`${
                          booking.genre ? booking.genre : "Science fiction"
                        }`}
                        value={values.genre}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <FormErrorMessage>{errors.genre}</FormErrorMessage>
                    </div>
                  </FormControl>
                  <FormControl isInvalid={!!errors.pages && touched.pages}>
                    <div className="w-full px-3">
                      <FormLabel fontSize={"xs"} textTransform={"uppercase"}>
                        {" "}
                        Pages
                      </FormLabel>
                      <Input
                        backgroundColor={
                          titleColor !== "#442C2E"
                            ? "RGBA(255, 255, 255, 0.16)"
                            : "gray.200"
                        }
                        focusBorderColor={
                          titleColor !== "#442C2E"
                            ? "RGBA(255, 255, 255, 0.28)"
                            : "rgba(0, 0, 0, 0.35)"
                        }
                        _focus={
                          titleColor !== "#442C2E"
                            ? { background: "RGBA(255, 255, 255, 0.18)" }
                            : { background: "white" }
                        }
                        id="pages"
                        type={"number"}
                        placeholder={`${
                          booking.pages ? booking.pages : "1462"
                        }`}
                        value={values.pages}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <FormErrorMessage>{errors.pages}</FormErrorMessage>
                    </div>
                  </FormControl>
                </div>
                <div className="flex -mx-3 mb-2">
                  <FormControl
                    isInvalid={!!errors.language && touched.language}
                  >
                    <div className="w-full px-3">
                      <FormLabel fontSize={"xs"} textTransform={"uppercase"}>
                        {" "}
                        Language
                      </FormLabel>
                      <Select
                        backgroundColor={
                          titleColor !== "#442C2E"
                            ? "RGBA(255, 255, 255, 0.16)"
                            : "gray.200"
                        }
                        focusBorderColor={
                          titleColor !== "#442C2E"
                            ? "RGBA(255, 255, 255, 0.28)"
                            : "rgba(0, 0, 0, 0.35)"
                        }
                        _focus={
                          titleColor !== "#442C2E"
                            ? { background: "RGBA(255, 255, 255, 0.18)" }
                            : { background: "white" }
                        }
                        id="language"
                        placeholder={`${
                          booking.language ? booking.language : "Language"
                        }`}
                        value={values.language}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      >
                        <option value="English">English</option>
                        <option value="Japanese">Japanese</option>
                        <option value="Portuguese">Portuguese</option>
                        <option value="German">German</option>
                        <option value="Chinese">Chinese</option>
                        <option value="French">French</option>
                        <option value="Italian">Italian</option>
                        <option value="Greek">Greek</option>
                        <option value="Russian">Russian</option>
                        <option value="Spanish">Spanish</option>
                      </Select>
                      <FormErrorMessage>{errors.language}</FormErrorMessage>
                    </div>
                  </FormControl>
                  <FormControl isInvalid={!!errors.country && touched.country}>
                    <div className="w-full px-3">
                      <FormLabel fontSize={"xs"} textTransform={"uppercase"}>
                        {" "}
                        Country
                      </FormLabel>
                      <Select
                        backgroundColor={
                          titleColor !== "#442C2E"
                            ? "RGBA(255, 255, 255, 0.16)"
                            : "gray.200"
                        }
                        focusBorderColor={
                          titleColor !== "#442C2E"
                            ? "RGBA(255, 255, 255, 0.28)"
                            : "rgba(0, 0, 0, 0.35)"
                        }
                        _focus={
                          titleColor !== "#442C2E"
                            ? { background: "RGBA(255, 255, 255, 0.18)" }
                            : { background: "white" }
                        }
                        id="country"
                        placeholder={`${
                          booking.country ? booking.country : "Country"
                        }`}
                        value={values.country}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      >
                        <option value="England">England</option>
                        <option value="Japan">Japan</option>
                        <option value="USA">USA</option>
                        <option value="Portugal">Portugal</option>
                        <option value="Spain">Spain</option>
                        <option value="Germany">Germany</option>
                        <option value="China">China</option>
                        <option value="France">France</option>
                        <option value="Italy">Italy</option>
                        <option value="Greece">Greece</option>
                        <option value="Russia">Russia</option>
                      </Select>
                      <FormErrorMessage>{errors.country}</FormErrorMessage>
                    </div>
                  </FormControl>
                  <FormControl
                    isInvalid={!!errors.publishDate && touched.publishDate}
                  >
                    <div className="w-full px-3">
                      <FormLabel fontSize={"xs"} textTransform={"uppercase"}>
                        {" "}
                        Publish Date
                      </FormLabel>
                      <InputGroup>
                        <Input
                          backgroundColor={
                            titleColor !== "#442C2E"
                              ? "RGBA(255, 255, 255, 0.16)"
                              : "gray.200"
                          }
                          focusBorderColor={
                            titleColor !== "#442C2E"
                              ? "RGBA(255, 255, 255, 0.28)"
                              : "rgba(0, 0, 0, 0.35)"
                          }
                          _focus={
                            titleColor !== "#442C2E"
                              ? { background: "RGBA(255, 255, 255, 0.18)" }
                              : { background: "white" }
                          }
                          id="publishDate"
                          type={"number"}
                          placeholder={`${
                            booking.publishDate ? booking.publishDate : "1862"
                          }`}
                          value={values.publishDate}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <InputRightElement
                          children={
                            titleColor !== "#442C2E" ? (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            ) : (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                              </svg>
                            )
                          }
                        />
                      </InputGroup>
                      <FormErrorMessage>{errors.publishDate}</FormErrorMessage>
                    </div>
                  </FormControl>
                </div>
              </ModalBody>
              <ModalFooter mt="2rem">
                <Button
                  isLoading={loading}
                  boxShadow={
                    "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;"
                  }
                  _hover={
                    titleColor !== "#442C2E"
                      ? {
                          background: "#B794F4",
                        }
                      : {
                          background: "RGBA(98, 0, 238, 0.92)",
                        }
                  }
                  mr={4}
                  background={backgrounds}
                  color={colors}
                  onClick={handldeSubmit}
                  leftIcon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
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
                  }
                >
                  {editing ? "CHANGE" : "ADD"}
                </Button>
                <Button
                  boxShadow={
                    "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px"
                  }
                  _hover={
                    titleColor !== "#442C2E"
                      ? {
                          background: "#B794F4",
                        }
                      : {
                          background: "RGBA(98, 0, 238, 0.92)",
                        }
                  }
                  background={backgrounds}
                  color={colors}
                  leftIcon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  }
                  onClick={() => {
                    resetForm();
                    onClose();
                    setBooking({
                      name: "",
                      author: "",
                      genre: "",
                      pages: "",
                      language: "",
                      country: "",
                      publishDate: "",
                    });
                  }}
                >
                  CLOSE
                </Button>
              </ModalFooter>
            </form>
          </ModalContent>
        </Modal>
      </div>
      <div className="mt-10">
        <Bookinfor
          useState={useState}
          onEditOpen={onEditOpen}
          cancelRef={cancelRef}
          AlertDialog={AlertDialog}
          AlertDialogBody={AlertDialogBody}
          AlertDialogFooter={AlertDialogFooter}
          AlertDialogHeader={AlertDialogHeader}
          AlertDialogContent={AlertDialogContent}
          AlertDialogOverlay={AlertDialogOverlay}
          AlertDialogCloseButton={AlertDialogCloseButton}
          toast={toast}
          onOpen={onOpen}
          Button={Button}
          isDeleteOpen={isDeleteOpen}
          onDeleteOpen={onDeleteOpen}
          onDeleteClose={onDeleteClose}
          onClose={onClose}
          Overlay={Overlay}
          setOverlay={setOverlay}
          books={books}
          setEditing={setEditing}
          booking={booking}
          setBooking={setBooking}
          resetForm={resetForm}
        />
      </div>
    </div>
  );
}

export default Forminfor;

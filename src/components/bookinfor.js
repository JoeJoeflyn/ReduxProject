import { useDispatch } from "react-redux";
import { deleteBook } from "../features/bookInforSlice";
import TimeAgo from "./TimeAgo";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  InputGroup,
  Input,
  InputRightElement,
  Box,
  Heading,
  Text,
  Flex,
  Spacer,
  useColorModeValue,
} from "@chakra-ui/react";
function Bookinfor({
  setEditing,
  onOpen,
  useState,
  isDeleteOpen,
  onDeleteClose,
  onDeleteOpen,
  setBooking,
  books,
  Button,
  toast,
  cancelRef,
}) {
  const [id, setId] = useState("");
  const dispatch = useDispatch();
  const [filteredData, setFilteredData] = useState([]);
  const location = useLocation();
  const [wordEntered, setWordEntered] = useState("");
  // search features
  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = books.filter((book) => {
      return book.name.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };
  // this func will take infor and id to do edit
  const hanldeEdit = (id) => {
    books.map((book) => {
      onOpen();
      if (book.id === id) {
        setBooking({
          id: book.id,
          name: book.name,
          author: book.author,
          genre: book.genre,
          pages: book.pages,
          language: book.language,
          country: book.country,
          publishDate: book.publishDate,
        });
        setEditing(book.id);
      }
    });
  };
  const bgColor = useColorModeValue("#FFFFFF", "RGBA(0, 0, 0, 0.24)");
  const textColor = useColorModeValue("#000000", "RGBA(255, 255, 255, 0.87)");
  const detailsColor = useColorModeValue("#6200EE", "#03DAC5");
  const deleteBtnColor = useColorModeValue("#E30425", "#FF0266");
  const timeColor = useColorModeValue(
    "RGBA(0, 0, 0, 0.48)",
    "RGBA(255, 255, 255, 0.67)"
  );

  return (
    <Box>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onDeleteClose}
        isOpen={isDeleteOpen}
        isCentered
      >
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader>Delete Your Book Information?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            Make sure you want to delete your book information, typing again is
            so lazy
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onDeleteClose} colorScheme="red">
              No
            </Button>
            <Button
              colorScheme="green"
              onClick={() => {
                dispatch(deleteBook(id));
                toast({
                  title: "Deleted Success",
                  position: "top-right",
                  description:
                    "Your book information has been deleted successfully",
                  status: "error",
                  isClosable: true,
                });
                onDeleteClose();
              }}
              ml={3}
            >
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Box
        rounded={"lg"}
        marginLeft="4%"
        className="w-2/5"
        backgroundColor={
          wordEntered &&
          (textColor !== "#000000"
            ? "RGBA(0, 0, 0, 0.12)"
            : "rgba(0, 0, 0, 0.03)")
        }
        p={"2"}
      >
        <Box
          backgroundColor={
            textColor !== "#000000"
              ? "RGBA(255, 255, 255, 0.02)"
              : "rgba(255, 255, 255, 0.35)"
          }
          color={textColor}
          rounded={"lg"}
        >
          <Box className="relative mx-auto text-gray-600">
            <InputGroup borderBottom={wordEntered && "1px"} size="md">
              <Input
                color={textColor}
                boxShadow={"lg"}
                p="6"
                type="text"
                placeholder="Search Book"
                value={wordEntered}
                onChange={handleFilter}
                border="none"
              />
              {filteredData.length === 0 ? (
                <InputRightElement mt="1.5" width="4.5rem">
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
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </InputRightElement>
              ) : (
                <InputRightElement mt="1.5" width="4.5rem">
                  <Button
                    _hover={{ background: "unset" }}
                    padding="unset"
                    background={"unset"}
                    onClick={() => {
                      setWordEntered("");
                      setFilteredData([]);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 hover:text-slate-500"
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
                  </Button>
                </InputRightElement>
              )}
            </InputGroup>
          </Box>
          {filteredData.length != 0 &&
            filteredData.slice(0, 15).map((value, index) => {
              return (
                <Link key={value.id} to={`/forminfor/${value.id}`}>
                  <Text
                    rounded={"lg"}
                    backgroundColor={
                      textColor !== "#000000"
                        ? "RGBA(255, 255, 255, 0.01)"
                        : "rgba(0, 0, 0, 0.03)"
                    }
                    marginTop={"1.5"}
                    className="px-4 py-3"
                  >
                    {value.name}{" "}
                  </Text>
                </Link>
              );
            })}
        </Box>
      </Box>
      <Flex mt={10} flexWrap="wrap" justifyContent="flex-start" direction="row">
        {books.map((book) => {
          return (
            <>
              <Box
                background={bgColor}
                color={textColor}
                key={book.id}
                width="25%"
                mb={10}
                marginX="calc(25% / 6)"
                rounded="2xl"
                p={7}
                shadow="md"
              >
                <Heading fontSize="xl">{book.name}</Heading>
                <Flex mt={2}>
                  <Text>Date: {book.publishDate}</Text>
                  <Spacer />
                  <Text>Country: {book.country}</Text>
                </Flex>
                <Flex mt={2}>
                  <Text>{book.author}</Text>
                  <Spacer />
                  <Link
                    state={{ background: location }}
                    to={`/forminfor/${book.id}`}
                  >
                    <Text
                      color={detailsColor}
                      fontWeight={"semibold"}
                      className="text-sm"
                      _hover={
                        textColor !== "#000000"
                          ? {
                              color: "rgba(3, 218, 197, 0.92)",
                            }
                          : {
                              color: "rgba(98, 0, 238, 0.89)",
                            }
                      }
                    >
                      DETAILS
                    </Text>
                  </Link>
                  <Outlet />
                </Flex>
                <Flex mt={2}>
                  <TimeAgo Text={Text} timestamp={book.time} />
                  <Spacer />
                  <Flex width="20%">
                    <button
                      onClick={() => {
                        hanldeEdit(book.id);
                      }}
                    >
                      <Text
                        _hover={
                          textColor !== "#000000"
                            ? {
                                color: "rgba(255, 255, 255, 0.74)",
                              }
                            : {
                                color: "rgba(0, 0, 0, 0.52)",
                              }
                        }
                        color={timeColor}
                      >
                        {textColor !== "#000000" ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                            />
                          </svg>
                        )}
                      </Text>
                    </button>
                    <Spacer />
                    <button
                      onClick={() => {
                        onDeleteOpen();
                        setId(book.id);
                      }}
                    >
                      <Text
                        _hover={
                          textColor !== "#000000"
                            ? {
                                color: "rgba(255, 2, 102, 0.86)",
                              }
                            : {
                                color: "rgba(227, 4, 37, 0.83)",
                              }
                        }
                        color={deleteBtnColor}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </Text>
                    </button>
                  </Flex>
                </Flex>
              </Box>
            </>
          );
        })}
      </Flex>
    </Box>
  );
}

export default Bookinfor;

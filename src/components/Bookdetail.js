import React from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Box, useColorModeValue } from "@chakra-ui/react";
import { useLayoutEffect } from "react";

function Bookdetail() {
  const books = useSelector((state) => state.bookinfor.books);
  const { bookId } = useParams();
  const book = books.find((book) => book.id === bookId);
  const formBgColor = useColorModeValue("#FFFFFF", "RGBA(12, 12, 21, 1)");
  const formTextColor = useColorModeValue(
    "#000000",
    "RGBA(255, 255, 255, 0.87)"
  );
  const [showModal, setShowModal] = React.useState(false);
  useLayoutEffect(() => {
    setShowModal(!showModal);
  }, []);
  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <Box
                background={formBgColor}
                color={formTextColor}
                className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none"
              >
                {/*header*/}
                <div className="flex items-start justify-end px-6 py-3 border-b border-solid border-slate-200 rounded-t">
                  <Link to={"/"}>
                    <Box>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </Box>
                  </Link>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <div className="flex font-bold text-xl items-start justify-start space-x-2">
                    <span className="text-purple-500">
                      <svg
                        className="h-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </span>
                    <span>ABOUT</span>
                  </div>
                  <div className="text-gray-700">
                    <div className="grid md:grid-cols-2 text-lg">
                      <Box color={formTextColor} className="grid grid-cols-2">
                        <div className="px-2 py-4 font-semibold">
                          Book Title
                        </div>
                        <div className="px-2 py-4">{book.name}</div>
                      </Box>
                      <Box color={formTextColor} className="grid grid-cols-2">
                        <div className="px-2 py-4 font-semibold">Author</div>
                        <div className="px-2 py-4">{book.author}</div>
                      </Box>
                      <Box color={formTextColor} className="grid grid-cols-2">
                        <div className="px-2 py-4 font-semibold">Genre</div>
                        <div className="px-2 py-4">{book.genre}</div>
                      </Box>
                      <Box color={formTextColor} className="grid grid-cols-2">
                        <div className="px-2 py-4 font-semibold">Pages</div>
                        <div className="px-2 py-4">{book.pages}</div>
                      </Box>
                      <Box color={formTextColor} className="grid grid-cols-2">
                        <div className="px-2 py-4 font-semibold">Language</div>
                        <div className="px-2 py-4">{book.language}</div>
                      </Box>
                      <Box color={formTextColor} className="grid grid-cols-2">
                        <div className="px-2 py-4 font-semibold">Country</div>
                        <div className="px-2 py-4">{book.country}</div>
                      </Box>
                      <Box color={formTextColor} className="grid grid-cols-2">
                        <div className="px-2 py-4 font-semibold">
                          Publish Date
                        </div>
                        <div className="px-2 py-4">{book.publishDate}</div>
                      </Box>
                    </div>
                  </div>
                </div>
              </Box>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}

export default Bookdetail;

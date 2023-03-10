import React from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import Peer from "peerjs";

import "../styles/index.css";

import Navbar from "../layouts/Navbar";
import { RoomContext } from "../context/room/RoomProvider";
import PopupRoomID from "../components/popup/PopupRoomID";

import { authToken, createMeeting } from "../api/api.service";

import BannerVideo from "../layouts/BannerVideo";
import HomeInput from "../components/home/HomeInput";

const bgImg = require("../assets/background/home.mp4");

const { CopyToClipboard } = require("react-copy-to-clipboard");

const Home = () => {
    const [inputValue, setInputValue] = React.useState<string>("");
    const [isCopied, setIsCopied] = React.useState<boolean>(false);
    const [isActive, setIsActive] = React.useState<boolean>(false);
    const [meetingID, setMeetingID] = React.useState<string | any>("");

    const roomID = React.useContext(RoomContext);

    const [peerId, setPeerId] = React.useState<string>("");
    const peer = new Peer();

    const handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void = (
        e
    ) => {
        setInputValue(e.target.value);
    };

    const handleCopyClipboard: () => void = () => {
        setIsCopied((isCopied) => !isCopied);
    };

    const handleActive: () => void = () => {
        setIsActive((isActive) => !isActive);
    };

    const handleGetMeetingAndToken = async () => {
        const meetingId = await createMeeting({ token: authToken });
        setMeetingID(meetingId);
    };

    const mouse = React.useRef<ReturnType<typeof Object>>({
        x: 0,
        y: 0,
        width: "2rem",
        height: "2rem",
        mixBlendMode: "",
    });

    return (
        <>
            <div
                id="Home"
                className="h-screen w-screen overflow-hidden relative flex justify-center items-center p-4"
                onMouseMove={(e) => {
                    gsap.to(mouse.current, {
                        top: e.clientY - 15,
                        left: e.clientX + 15,
                    });
                }}
            >
                <Navbar />

                <BannerVideo bgImg={bgImg} />

                <div
                    className="mt-[32rem] flex w-1/2 justify-center items-center"
                    onMouseMove={(e) => {
                        gsap.to(mouse.current, {
                            top: e.clientY - 15,
                            left: e.clientX + 5,

                            width: "6rem",
                            height: "6rem",

                            mixBlendMode: "difference",
                        });
                    }}
                    onMouseLeave={(e) => {
                        gsap.to(mouse.current, {
                            top: e.clientY - 15,
                            left: e.clientX + 15,

                            width: "2rem",
                            height: "2rem",

                            mixBlendMode: "",
                        });
                    }}
                >
                    <HomeInput />
                </div>

                <div className="absolute bottom-4 left-4">
                    <Link
                        to="/about"
                        className="font-bold text-white hover:underline"
                        onMouseMove={(e) => {
                            gsap.to(mouse.current, {
                                top: e.clientY - 15,
                                left: e.clientX + 5,

                                width: "6rem",
                                height: "6rem",

                                mixBlendMode: "difference",
                            });
                        }}
                        onMouseLeave={(e) => {
                            gsap.to(mouse.current, {
                                top: e.clientY - 15,
                                left: e.clientX + 15,

                                width: "2rem",
                                height: "2rem",

                                mixBlendMode: "",
                            });
                        }}
                    >
                        T??m hi???u th??m
                    </Link>
                    <span className="ml-1 text-white">v??? ch??ng t??i</span>
                </div>

                {/* CURSOR */}
                <div
                    style={{
                        width: mouse.current.width,
                        height: mouse.current.height,

                        top: mouse.current.x,
                        left: mouse.current.y,
                        position: "absolute",
                    }}
                    ref={mouse}
                    className="rounded-full transition duration-150 overflow-hidden flex justify-center items-center bg-white z-[99]"
                ></div>

                {/* Popup */}
                <PopupRoomID
                    id={meetingID}
                    isActive={isActive}
                    togglePopup={handleActive}
                />
            </div>
        </>
    );
};

export default Home;

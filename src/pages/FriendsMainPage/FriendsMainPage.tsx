import { Outlet, useNavigate } from "react-router-dom";

export default function FriendsMainPage () {
    const router = useNavigate()
    return (
        <div className="flex flex-col gap-4 w-[1400px]">
            <div className="flex justify-around items-center ">
                <p className="text-2xl cursor-pointer" onClick={() => router('/account/friends')}>friends list</p>
                <p className="text-2xl cursor-pointer" onClick={() => router('/account/friends/requests')}>requests list</p>
            </div>
            <Outlet />
        </div>
    )
}
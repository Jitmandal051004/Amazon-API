import { Authbox, UserInfo } from "@/components";

export default function Home() {
  return (
    <div className="flex h-screen w-full justify-center items-center">
      <div className='w-full flex justify-center items-center'>
        <UserInfo />
      </div>
    </div>
  );
}

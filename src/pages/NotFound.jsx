import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex min-h-screen justify-center items-center">
      <div className="text-center">
        <h1 className="font-bold text-4xl text-gray-900">404</h1>
        <p className="font-bold text-xl text-gray-900">
          페이지를 찾을 수 없습니다
        </p>
        <Link
          className="
            inline-block
            mt-8
           text-indigo-900 
           hover:text-indigo-950
            underline
            "
          to={"/"}>
          홈으로 돌아가기
        </Link>
      </div>
    </div>
  );
}

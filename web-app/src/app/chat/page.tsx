import Header from "@/components/header";
import Layout from "@/components/layout/index";

import { AudioLines, ArrowBigRight } from "lucide-react";

const ChatPage = () => {
  return (
    <div className="chatLayout">
      <Header currentTab={"chat"} />

      <section className="overflow-hidden historyGrid">
        <ChatHistory />
      </section>
      <section className="chatGrid ">
        <ChatSection />
      </section>
    </div>
  );
};

const ChatHistory = () => {
  return (
    <div className="max-w-max relative h-full overflow-y-auto overflow-x-clip ">
      <nav className=" p-3 pb-3.5 ">
        <div className="flex flex-col ">
          {[...Array(10)].map((_, i) => (
            <ChatButton key={i} id={i + 1} />
          ))}
        </div>

        <div className=" h-8 bg-slate-800 flex justify-center items-center rounded-sm mt-2">
          <button className="underline text-sm text-white">
            Carregar mais
          </button>
        </div>
      </nav>
    </div>
  );
};

const ChatButton = ({ id }) => {
  return (
    <button className="w-full flex items-center hover:bg-slate-200 hover:rounded-sm p-2 border-b-[1px] border-black border-solid">
      <span className="text-sm truncate ">
        {id}. CHAT REUNIÃO LOREM IPSUM DORI SIMET
      </span>
    </button>
  );
};

const ChatSection = () => {
  return (
    <div className="relative flex flex-col items-center justify-center gap-10 p-4 h-full bg-slate-200 ">
      <h1 className="flex items-center justify-center font-bold text-2xl font-stale-900 text-black">
        CHAT REUNIÃO LOREM IPSUM DORI SIMET
      </h1>
      <div className="flex flex-col gap-6 h-full max-h-full overflow-x-clip overflow-y-auto min-w-[60%] max-w-[1000px]">
        <UserMessage
          message={
            "Dessa forma, você pode acessar os cookies da solicitação dentro da função getServerSideProps, inicializar seu serviço de cookies e passar os cookies para a página como propriedades. No componente da página, você pode usar useRouter() para acessar o roteador Next.js."
          }
        />
        <AssistantMessage
          message={`Para acessar os cookies dentro da função onSubmit, você precisará passá-los como um parâmetro para a função. No entanto, você precisa garantir que os cookies estejam disponíveis no escopo onde a função onSubmit é chamada.

Se você estiver usando o Next.js, pode acessar os cookies da solicitação dentro de uma função getServerSideProps e, em seguida, passá-los para a página como propriedades. Assim, você pode acessá-los dentro da função onSubmit por meio das propriedades do componente.

Aqui está um exemplo de como você pode fazer isso:`}
        />
        <UserMessage
          message={
            "Dessa forma, você pode acessar os cookies da solicitação dentro da função getServerSideProps, inicializar seu serviço de cookies e passar os cookies para a página como propriedades. No componente da página, você pode usar useRouter() para acessar o roteador Next.js."
          }
        />
        <AssistantMessage
          message={`Para acessar os cookies dentro da função onSubmit, você precisará passá-los como um parâmetro para a função. No entanto, você precisa garantir que os cookies estejam disponíveis no escopo onde a função onSubmit é chamada.

Se você estiver usando o Next.js, pode acessar os cookies da solicitação dentro de uma função getServerSideProps e, em seguida, passá-los para a página como propriedades. Assim, você pode acessá-los dentro da função onSubmit por meio das propriedades do componente.

Aqui está um exemplo de como você pode fazer isso:`}
        />
        <UserMessage
          message={
            "Dessa forma, você pode acessar os cookies da solicitação dentro da função getServerSideProps, inicializar seu serviço de cookies e passar os cookies para a página como propriedades. No componente da página, você pode usar useRouter() para acessar o roteador Next.js."
          }
        />
        <AssistantMessage
          message={`Para acessar os cookies dentro da função onSubmit, você precisará passá-los como um parâmetro para a função. No entanto, você precisa garantir que os cookies estejam disponíveis no escopo onde a função onSubmit é chamada.

Se você estiver usando o Next.js, pode acessar os cookies da solicitação dentro de uma função getServerSideProps e, em seguida, passá-los para a página como propriedades. Assim, você pode acessá-los dentro da função onSubmit por meio das propriedades do componente.

Aqui está um exemplo de como você pode fazer isso:`}
        />
        <UserMessage message={"LOREM IPSUM DORI SIMET"} />
        <AssistantMessage message={"LOREM IPSUM DORI SIMET"} />
      </div>
      <ChatInputText />
    </div>
  );
};

const ChatInputText = () => {
  return (
    <nav className="sticky flex m-auto items-center bottom-4 right-0 bg-slate-300 pl-8 pr-2 py-2 rounded-full w-[60%] max-w-[1000px]">
      <textarea
        className="h-10 flex-1 bg-transparent text-black placeholder:text-gray-700 pt-2 pl-2 active:border-none focus:border-none resize-none"
        placeholder="Digite oque voce gostaria de saber sobre a reunião"
        rows={1}
      />
      <button className="ml-2 text-sm rounded-full bg-slate-600 p-3 text-white">
        <ArrowBigRight className="w-6 h-6" />
      </button>
    </nav>
  );
};

const AssistantMessage = ({ message }) => {
  return (
    <div className="flex gap-1 max-w-[80%]">
      <div className="bg-slate-300 p-2 h-fit rounded-tr-lg rounded-bl-lg rounded-tl-lg">
        <AudioLines className="w-6 h-6" />
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="text-md font-bold">Meeting Ai</h3>
        <div className="bg-white w-fit  p-4 rounded-tr-lg rounded-br-lg rounded-bl-lg  shadow-lg">
          {message}
        </div>
      </div>
    </div>
  );
};

const UserMessage = ({ message }) => {
  return (
    <div className="flex flex-row-reverse gap-1 place-self-end max-w-[80%]">
      <div className="bg-slate-300 overflow-hidden w-[40px] h-[40px] min-w-[40px] min-h-[40px] rounded-tr-lg rounded-br-lg rounded-tl-lg">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXyLZByyEVcZzoTKBSh0jplF_zAi2uFuvVCQ&s"
          alt="ProfilePicture"
          width={60}
          height={60}
        />
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="text-md font-bold text-right">Eduardo Ferraz</h3>
        <div className="bg-sky-300 text-sky-950 w-fit  p-4 rounded-tl-lg rounded-br-lg rounded-bl-lg shadow-lg">
          {message}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;

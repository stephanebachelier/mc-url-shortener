import React, { FormEvent, useState } from 'react';
import logo from './logo.svg';
import {
  useAddMessageMutation,
  useGetMessagesQuery,
} from './graphql/message.generated';
import {
  useAddUrlMutation,
} from './graphql/url.generated';

function App() {
  const [newMessage, setNewMessage] = useState({ value: '' });
  const [url, setUrl] = useState({ value: '', error: false });
  const [tokenizedUrl, setTokenizedUrl] = useState({ origin: '', shortenedUrl: '' });
  const { data, refetch } = useGetMessagesQuery();
  const [addMessage] = useAddMessageMutation();
  const [addUrl] = useAddUrlMutation();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage({ value: e.target.value });
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newMessage.value) {
      await addMessage({ variables: { message: newMessage.value } });
      setNewMessage({ value: '' });
      await refetch();
    }
  };

  const onUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setUrl({
      value: e.target.value,
      error: !value.startsWith('http://'),
    });
  };

  const onUrlSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (url.value) {
      const response = await addUrl({ variables: { origin: url.value } });
      console.log(response?.data);

      const $tokenizedUrl = response?.data?.url;

      if ($tokenizedUrl) {
        setUrl({ value: '', error: false });
        setTokenizedUrl({
          origin: $tokenizedUrl.origin,
          shortenedUrl: `http://localhost:4000/short/${$tokenizedUrl.token}`,
        });
      }
    }
  };

  return (
    <div className="bg-main-blue min-h-screen">
      <header className="container mx-auto py-14 flex justify-between">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="text-white font-bold text-2xl">
          URL shortener
        </h1>
      </header>
      <section className="container mx-auto py-8">
        <div
          data-cy="urlContainer"
          className="p-8 flex flex-col gap-6 items-center bg-white rounded-2xl"
        >
          <div
            className="font-semibold text-xl"
          >
            Add an url to be shortened :
          </div>
          <div className="font-semibold">
            <form
              className="flex gap-4"
              onSubmit={onUrlSubmit}
            >
              <input
                data-cy="urlInput"
                placeholder="Your url"
                className="p-3 w-96 border-2 rounded-full border-main-blue"
                value={url.value}
                onChange={onUrlChange}
              />
              <button
                data-cy="urlSubmit"
                type="submit"
                className="p-3 bg-main-blue text-white rounded-full"
                disabled={(url.error || !url.value.length)}
              >
                Shorten
              </button>
            </form>
          </div>
          {tokenizedUrl.origin && (
            <div>
              <div data-cy="urlOrigin">
                {tokenizedUrl.origin}
              </div>
              <div data-cy="urlShortened">
                <a href={tokenizedUrl.shortenedUrl} target="_blank" rel="noreferrer">
                  {tokenizedUrl.shortenedUrl}
                </a>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="container mx-auto py-8">
        <div
          data-cy="messageContainer"
          className="p-8 flex flex-col gap-6 items-center bg-white rounded-2xl"
        >
          <div
            className="font-semibold text-xl"
          >
            Add a few messages to ensure that everything is working correctly :
          </div>
          {data?.messages.map((message) => (
            <div key={message.id}>{message.message}</div>
          ))}
          <div className="font-semibold">
            <form
              className="flex gap-4"
              onSubmit={onSubmit}
            >
              <input
                data-cy="messageInput"
                placeholder="Your message"
                className="p-3 w-96 border-2 rounded-full border-main-blue"
                value={newMessage.value}
                onChange={onChange}
              />
              <button
                data-cy="submit"
                type="submit"
                className="p-3 bg-main-blue text-white rounded-full"
              >
                Add message
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;

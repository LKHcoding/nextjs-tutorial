import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Axios from "axios";
import Item from "../../src/component/Item";
import { Loader } from "semantic-ui-react";
import Head from "next/head";

const Post = ({ item, name }) => {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <div style={{ padding: "100px 0" }}>
        <Loader active inline="centered">
          Loading
        </Loader>
      </div>
    );
  }
  // const { id } = router.query;

  // const [item, setItem] = useState({});
  // const [isLoading, setIsLoading] = useState(true);

  // const API_URL = `http://makeup-api.herokuapp.com/api/v1/products/${id}.json`;
  // function getData() {
  //   Axios.get(API_URL).then((res) => {
  //     // console.log(res.data);
  //     setItem(res.data);
  //     setIsLoading(false);
  //   });
  // }
  // useEffect(() => {
  //   if (id && id > 0) {
  //     getData();
  //   }
  // }, [id]);

  return (
    <>
      {/* {isLoading ? (
        <div style={{ padding: "300px 0" }}>
          <Loader inline="centered" active>
            Loading
          </Loader>
        </div>
      ) : (
        <Item item={item} />
      )} */}

      {item && (
        <>
          <Head>
            <title>{item.name}</title>
            <meta name="description" content={item.description} />
          </Head>
          {`${name} 환경 입니다.`}
          <Item item={item} />
        </>
      )}
    </>
  );
};

export default Post;

export async function getStaticPaths() {
  const apiUrl = process.env.apiUrl;
  const res = await Axios.get(apiUrl);
  const data = res.data;

  return {
    // paths: [
    //   { params: { id: "740" } },
    //   { params: { id: "730" } },
    //   { params: { id: "729" } },
    // ],
    paths: data.map((item) => ({
      params: {
        id: item.id.toString(),
      },
    })),
    fallback: true,
    // fallback이 true면 getStaticPaths 로 전달된 경로들은 빌드타임에 만들어지는건 변함없음
    // 나머지는 최초 접속시 props가 빈상태로 그려지고, 이후에 백그라운드에서 정적파일로 html 과json을 생성해준다.
    // next.js는 프리랜더링 목록에 추가한다. 2번째 접속부터는 정적 생성된 페이지를 사용한다.

    // fallback 을 true로 사용하는것은 페이지가 굉장히 많을경우 유용함.
    // 모든제품을 프리랜더링 하고싶겠지만 그렇게하면 빌드타임이 늘어남
    // 최초로 접속한 유저는 빈화면을 잠깐 보게되겠지만 이후 접속한 유저들은 정적파일로
    // 빠르게 제공받는다
  };
}

export async function getStaticProps(context) {
  const id = context.params.id;
  const apiUrl = `http://makeup-api.herokuapp.com/api/v1/products/${id}.json`;
  const res = await Axios.get(apiUrl);
  const data = res.data;

  return {
    props: {
      item: data,
      name: process.env.name,
    },
  };
}

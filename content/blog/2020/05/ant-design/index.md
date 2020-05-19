---
title: Ant Designのコンポーネントの書き方が好き
date: '2020-05-19T00:25:06Z'
---

サクッと読めるシリーズです。

Web フロントエンドを書くときに UI フレームワーク使ってますか?  
僕はフロントエンドデザインを考えるのは好きですが、
書くのには苦手意識があるので趣味プロジェクトのほとんどではどうにかしてフレームワークを使えないか考えていたりします。

今日も UI フレームワークを探していて、書き方が気に入ったものを見つけたのでサクッと書いていきます。

## Ant Design

![icon](./icon.svg)

[Ant Design](https://ant.design/)は内部設計を抽象化し、デベロッパーがユーザーエクスペリエンスに集中できるようにすることを目的として開発されているそうです。

この恩恵をより感じられるコンポーネントとして`Form`を取り上げます。

### 比較

[Material UI](https://material-ui.com/)を始めとする多くの UI フレームワークを用いてフォームを実装する場合は、
各インプット要素を配置して、その Value を State で管理して validation したりするのが基本的な使い方になっていると思います。

```jsx
export const Demo = () => {
  const [v, setV] = useState('');

  return (
    <form
      onSubmit={() => {
        console.log(v);
      }}
    >
      <TextField
        onChange={e => {
          setV(e.target.value);
        }}
        error={v !== 'Hello World'}
        label="Sample"
        variant="filled"
        helperText="Incorrect entry."
      />
      <Button type="submit">Submit</Button>
    </form>
  );
};
```

対して Ant Design の場合はどのように作るのかと言うと、`Form`コンポーネントが用意されており、このコンポーネントが内部の State 管理を請け負ってくれるようになります。

```jsx
export const Demo = () => {
  const [form] = Form.useForm();

  return (
    <Form
      form={form}
      name="control-hooks"
      onFinish={v => {
        console.log(v);
      }}
    >
      <Form.Item
        name="sample"
        label="Sample"
        rules={[
          {
            validator: (_, value) =>
              value === 'Hello World'
                ? Promise.resolve()
                : Promise.reject('Should accept agreement'),
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
```

[Rules](https://ant.design/components/form/#Rule)が特に優秀だと感じました。

究極は好みの問題ですが、僕には複雑なことを考えずに書ける Ant Design が好きでした。

[Mobile 向けのライブラリ](https://mobile.ant.design/)もあるようなので合わせて Ant Design を試してみてください!

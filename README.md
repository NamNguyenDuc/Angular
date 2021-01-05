Single page application (SPA) frameworks có lẽ đang nhận được sự chú ý rất lớn trong thế giới javascript trong các năm qua. Việc xử lý hầu hết các công việc tại client, bảo trì "state" và giảm độ trễ khi chuyển qua các trang chỉ là một trong số các lợi ích của SPA. Nói tóm lại SPA đem lại trải nghiệm tuyệt vời cho người dùng. Tuy nhiên, chúng ta có một vấn đề nhỏ là: Ứng dụng cần được indexed bởi seach engines.

Nhiều search engines và mạng xã hội giống như Facebook và Twetter mong đợi plain HTML để sử dụng meta tags và nội dung trang có liên quan. Chúng không thể xác định khi nào JavaScript framework hoàn thành việc dựng trang. Như một kết quả, chúng chỉ có thể thấy mộ phần rất nhỏ của HTML. Hay nói một các khác, SPA chống lại search engines. Mặc dù, Google có thể thu thập thông tin và render một cách đẩy đủ hầu hết các website động, nhưng đối với các link được chia sẻ trên mạng xã hội có vẻ không được ổn. Mọi người có thể thấy trong hình sau:



Như vậy, chúng ta cần sự hỗ trợ của SEO. Đúng.

Chúng ta cần search engines, mạng xã hội và người dùng của ứng dụng thấy một server-rendered view như việc render phía server là đáng tin cậy, mềm dẻo và hiệu quả để đảm bảo tất cả search engines và mạng xã hội có thể đọc được nội dung của trang. Đây là Angular Universal:



1. Universal là gì?
Trang web chính thức tuyên bố rằng Universal là "Server-side Rendering for Angular apps". Nó là phần mềm trung gian nằm giữa node.js và Angular.

Nói một cách đơn giản, nó cung cấp thứ tốt nhất cho cả hai bên: Trải nghiệm người dùng và hiệu suất cao và của SPA kết hợp với tính thân thiện với SEO của các trang tĩnh.

Mọi người có thể tham khảo thêm tại trang chính thức Angular Universal.

2. Cấu hình
Với Angular Universal hiện tại thì mọi người chỉ cần sủ dụng lệnh: ng add @nguniversal/express-engine

khi ta sử dụng lệnh trên thì angular sẽ tự cấu hình các file cần thiết để chúng ta có thể render được từ phía server.

và để có thể render được từ phía server thì chúng ta không thể chạy lệnh "ng serve" như bình thường mà chúng ta cần chạy lệnh "npm run dev:ssr" khi chạy xong bạn sẽ vào website của mình xem ở network thì có thể thấy website đang đươc trả từ 1 cục html rồi đó!



À còn nữa khi mọi người muốn update thẻ meta theo như mình mong muốn thì đừng quên sử dụng updateTag của thẻ meta mà angular đã hỗ trợ cho mình nhé!

Mọi người nên đọc cái này https://angular.io/api/platform-browser/Meta để hiểu về thẻ meta mà angular đã hỗ trợ cho mình sử dụng như nào nhé!

Còn dưới đây mình sẽ demo cho các bạn cách mình update thẻ meta nhé!

import { Meta, Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'update-tags',
    templateUrl: './update-tags.component.html',
})
export class PostsDetailComponent implements OnInit {

    constructor( private meta: Meta ) { }

    ngOnInit(): void {
		this.meta.updateTag({ property: 'og:image', itemprop: 'thumbnailUrl', content: 'https://api.daucosmetic.com/upload/products/2fb1582e08947da881c7adb451f52107' });
        this.meta.updateTag({ property: 'og:title', itemprop: 'headline', content: 'Title Update Tags' });
        this.meta.updateTag({ property: 'og:description', itemprop: 'description', content: 'Description Update Tags' });
    }
}

Kết luận:  vậy là khi thực hiện đến đây mọi người có thể render website của mình bằng SSR(Server Side Rendering) rồi. Nếu các bạn muốn biết cách config file docker để có thể thực hiện đẩy website của mình lên host thì hãy cùng mình đi đến bước tiếp theo nhé!

3. Cấu hình file Docker
Tiếp theo nếu mọi người muốn đẩy lên server/host thì không thể bỏ qua bước tiếp theo này!

Để đi vào bước tiếp theo này thì bạn cần có kiến thức cơ bản nhất về một vài lệnh của Docker nên nếu bạn chưa biết bạn có thể đi tìm hiểu qua về một số lệnh cơ bản của Docker khi qua bước tiếp theo này!!!

Và đây là link tài liệu về Docker bằng tiếng việt mình có được chia sẻ: https://github.com/hocchudong/ghichep-docker/tree/master/docs/docker-coban

Mình khuyên mọi người đọc được tiếng anh thì nên lên trang chủ để đọc tài liệu chuẩn về Docker: https://docs.docker.com/get-started



Nếu các bạn đã biết về Docker thì mình có thể đi vào bước tiếp theo này rồi!

Đầu tiên các bạn tạo file tên là Dockerfile nội dung như sau:

FROM node:14

RUN mkdir /usr/src/app
WORKDIR /usr/src/app

COPY package*.json /usr/src/app/
RUN npm ci

COPY ./ /usr/src/app

EXPOSE 4000

RUN npm run build:ssr
CMD [ "npm", "run", "serve:ssr" ]



Tiếp theo chúng ta sẽ cần có file docker-compose.yml

version: "1.0"
services:
        angular:
                container_name: angular
                build: ./angular/
                ports:
                        - '4000:4000'
                environment:
                        - PORT=4000
                networks:
                        - backend
        nginx:
                container_name: nginx
                image: nginx:1.15
                ports:
                        - '80:80'
                networks: 
                        - backend
                depends_on:
                        - angular
                volumes: 
                        - ./nginx.conf:/etc/nginx/conf.d/default.conf
networks:
        backend:
                driver: bridge



và file cuối cùng mọi người cần tạo là nginx.conf

upstream docker-angular {
  server angular:4000;
}
server {
  listen 80;
  location / {
    proxy_pass http://docker-angular;
  }
}
Khi mọi người đã config xong 3 file trên rồi thì chúng ta chỉ việc build file docker và run image chúng ta build được là chúng ta đã có 1 project được sử dụng SSR của angular rồi!

Chúc mọi người thành công!!!



Link tài liệu tham khảo: 

https://blog.angular-university.io/angular-universal/

https://angular.io/guide/universal

https://angular.io/api/platform-browser/Meta

https://medium.com/burak-tasci/angular-4-with-server-side-rendering-aka-angular-universal-f6c228ded8b0

https://www.ngdevelop.tech/dynamically-add-title-and-meta-tags-on-route-change-in-angular/

https://docs.docker.com/get-started/

https://github.com/hocchudong/ghichep-docker/tree/master/docs/docker-coban

...

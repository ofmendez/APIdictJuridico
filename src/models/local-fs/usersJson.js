const users_ = `[
	{
		"id": 1,
		"email": "john@mail.com",
		"password": "changeme",
		"name": "Jhon",
		"role": "customer",
		"avatar": "https://i.imgur.com/M3QKiC5.jpeg",
		"creationAt": "2023-11-06T10:57:31.000Z",
		"updatedAt": "2023-11-06T10:57:31.000Z"
	},
	{
		"id": 2,
		"email": "maria@mail.com",
		"password": "12345",
		"name": "Maria",
		"role": "customer",
		"avatar": "https://i.imgur.com/DumuKkD.jpeg",
		"creationAt": "2023-11-06T10:57:31.000Z",
		"updatedAt": "2023-11-06T10:57:31.000Z"
	},
	{
		"id": 3,
		"email": "admin@mail.com",
		"password": "admin123",
		"name": "Admin",
		"role": "admin",
		"avatar": "https://i.imgur.com/gxaUWSF.jpeg",
		"creationAt": "2023-11-06T10:57:31.000Z",
		"updatedAt": "2023-11-06T10:57:31.000Z"
	},
	{
		"id": 4,
		"email": "sf@mail.ru",
		"password": "safdsfdsfd",
		"name": "dfsfsaf",
		"role": "customer",
		"avatar": "https://place-hold.it/300",
		"creationAt": "2023-11-06T10:57:41.000Z",
		"updatedAt": "2023-11-06T10:57:41.000Z"
	},
	{
		"id": 5,
		"email": "dima@mail.ru",
		"password": "sdafdsfsdadf",
		"name": "dfsaf",
		"role": "customer",
		"avatar": "https://place-hold.it/300",
		"creationAt": "2023-11-06T11:01:01.000Z",
		"updatedAt": "2023-11-06T11:01:01.000Z"
	},
	{
		"id": 6,
		"email": "dima@mail.ru",
		"password": "dima1997",
		"name": "dima",
		"role": "customer",
		"avatar": "https://place-hold.it/300",
		"creationAt": "2023-11-06T11:01:46.000Z",
		"updatedAt": "2023-11-06T11:01:46.000Z"
	},
	{
		"id": 7,
		"email": "dima@mail.ru",
		"password": "dima1997",
		"name": "lada",
		"role": "customer",
		"avatar": "https://place-hold.it/300",
		"creationAt": "2023-11-06T11:02:30.000Z",
		"updatedAt": "2023-11-06T11:02:30.000Z"
	},
	{
		"id": 8,
		"email": "lada@mail.ru",
		"password": "dima1997",
		"name": "dima1997",
		"role": "customer",
		"avatar": "https://place-hold.it/300",
		"creationAt": "2023-11-06T11:04:01.000Z",
		"updatedAt": "2023-11-06T11:04:01.000Z"
	},
	{
		"id": 9,
		"email": "example@mail.ru",
		"password": "dima1997",
		"name": "dima",
		"role": "customer",
		"avatar": "https://place-hold.it/300",
		"creationAt": "2023-11-06T11:05:00.000Z",
		"updatedAt": "2023-11-06T11:05:00.000Z"
	},
	{
		"id": 10,
		"email": "dima@mail.ru",
		"password": "dima1997",
		"name": "dima",
		"role": "customer",
		"avatar": "https://place-hold.it/300",
		"creationAt": "2023-11-06T11:11:47.000Z",
		"updatedAt": "2023-11-06T11:11:47.000Z"
	},
	{
		"id": 11,
		"email": "khaled123@gmail.com",
		"password": "Pasword000",
		"name": "khaled",
		"role": "admin",
		"avatar": "https://images.app.goo.gl/vGPLcYUHR47CEdf59",
		"creationAt": "2023-11-06T11:31:59.000Z",
		"updatedAt": "2023-11-06T11:31:59.000Z"
	},
	{
		"id": 12,
		"email": "abghi99@gmail.com",
		"password": "abghi12399",
		"name": "Abghi99",
		"role": "customer",
		"avatar": "https://api.lorem.space/image/face?w=640&h=480",
		"creationAt": "2023-11-06T11:50:56.000Z",
		"updatedAt": "2023-11-06T11:50:56.000Z"
	},
	{
		"id": 13,
		"email": "yanto@gmail.com",
		"password": "yanto123",
		"name": "Uzumaki Yanto",
		"role": "customer",
		"avatar": "https://placehold.co/600x400.png",
		"creationAt": "2023-11-06T12:23:05.000Z",
		"updatedAt": "2023-11-06T12:23:05.000Z"
	},
	{
		"id": 14,
		"email": "nico@gmail.com",
		"password": "1234",
		"name": "Nicolas",
		"role": "customer",
		"avatar": "https://api.lorem.space/image/face?w=640&h=480&r=867",
		"creationAt": "2023-11-06T13:04:07.000Z",
		"updatedAt": "2023-11-06T13:04:07.000Z"
	},
	{
		"id": 15,
		"email": "dasdasd@gml.com",
		"password": "asdasdasdasdasd",
		"name": "dasdasdasd",
		"role": "customer",
		"avatar": "https://api.lorem.space/image/face?w=640&h=480&r=867",
		"creationAt": "2023-11-06T13:05:03.000Z",
		"updatedAt": "2023-11-06T13:05:03.000Z"
	},
	{
		"id": 16,
		"email": "developer@gmail.com",
		"password": "skillbasdasdox",
		"name": "dasdasd",
		"role": "customer",
		"avatar": "https://www.tadviser.ru/images/f/fb/Google_logo_2015.png",
		"creationAt": "2023-11-06T13:40:23.000Z",
		"updatedAt": "2023-11-06T13:40:23.000Z"
	},
	{
		"id": 17,
		"email": "wonnie8@gmail.com",
		"password": "vince020",
		"name": "Wonnie",
		"role": "customer",
		"avatar": "https://api.escuelajs.co/api/v1/files/2656.jpg",
		"creationAt": "2023-11-06T14:18:50.000Z",
		"updatedAt": "2023-11-06T14:18:50.000Z"
	},
	{
		"id": 18,
		"email": "wonnie8@gmail.com",
		"password": "vince020",
		"name": "Wonnie",
		"role": "customer",
		"avatar": "https://api.escuelajs.co/api/v1/files/2656.jpg",
		"creationAt": "2023-11-06T14:18:54.000Z",
		"updatedAt": "2023-11-06T14:18:54.000Z"
	},
	{
		"id": 19,
		"email": "wonnie8@gmail.com",
		"password": "vince020",
		"name": "Wonnie",
		"role": "customer",
		"avatar": "https://api.escuelajs.co/api/v1/files/2656.jpg",
		"creationAt": "2023-11-06T14:19:16.000Z",
		"updatedAt": "2023-11-06T14:19:16.000Z"
	},
	{
		"id": 20,
		"email": "agustakut@gmail.com",
		"password": "agus123",
		"name": "Agus",
		"role": "customer",
		"avatar": "https://ui-avatars.com/api/?name=Agus",
		"creationAt": "2023-11-06T15:20:43.000Z",
		"updatedAt": "2023-11-06T15:20:43.000Z"
	},
	{
		"id": 21,
		"email": "chris3@mail.com",
		"password": "12345",
		"name": "Christian2",
		"role": "admin",
		"avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTH01ZJN9-L6VYwouNWGU1mdxm8dp99gjJ2ofi8tNw&s",
		"creationAt": "2023-11-06T15:39:43.000Z",
		"updatedAt": "2023-11-06T15:39:43.000Z"
	},
	{
		"id": 22,
		"email": "chris3@mail.com",
		"password": "12345",
		"name": "Christian2",
		"role": "admin",
		"avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTH01ZJN9-L6VYwouNWGU1mdxm8dp99gjJ2ofi8tNw&s",
		"creationAt": "2023-11-06T15:39:54.000Z",
		"updatedAt": "2023-11-06T15:39:54.000Z"
	},
	{
		"id": 23,
		"email": "chris3@mail.com",
		"password": "12345",
		"name": "Christian2",
		"role": "admin",
		"avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTH01ZJN9-L6VYwouNWGU1mdxm8dp99gjJ2ofi8tNw&s",
		"creationAt": "2023-11-06T15:40:01.000Z",
		"updatedAt": "2023-11-06T15:40:01.000Z"
	},
	{
		"id": 24,
		"email": "chris3@mail.com",
		"password": "12345",
		"name": "Christian2",
		"role": "admin",
		"avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTH01ZJN9-L6VYwouNWGU1mdxm8dp99gjJ2ofi8tNw&s",
		"creationAt": "2023-11-06T15:40:12.000Z",
		"updatedAt": "2023-11-06T15:40:12.000Z"
	},
	{
		"id": 25,
		"email": "chris3@mail.com",
		"password": "12345",
		"name": "Christian2",
		"role": "admin",
		"avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTH01ZJN9-L6VYwouNWGU1mdxm8dp99gjJ2ofi8tNw&s",
		"creationAt": "2023-11-06T15:40:20.000Z",
		"updatedAt": "2023-11-06T15:40:20.000Z"
	},
	{
		"id": 26,
		"email": "chris3@mail.com",
		"password": "12345",
		"name": "Christian2",
		"role": "admin",
		"avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTH01ZJN9-L6VYwouNWGU1mdxm8dp99gjJ2ofi8tNw&s",
		"creationAt": "2023-11-06T15:40:42.000Z",
		"updatedAt": "2023-11-06T15:40:42.000Z"
	},
	{
		"id": 27,
		"email": "chris3@mail.com",
		"password": "12345",
		"name": "Christian2",
		"role": "admin",
		"avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTH01ZJN9-L6VYwouNWGU1mdxm8dp99gjJ2ofi8tNw&s",
		"creationAt": "2023-11-06T15:40:47.000Z",
		"updatedAt": "2023-11-06T15:40:47.000Z"
	},
	{
		"id": 28,
		"email": "chris3@mail.com",
		"password": "12345",
		"name": "Christian2",
		"role": "admin",
		"avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTH01ZJN9-L6VYwouNWGU1mdxm8dp99gjJ2ofi8tNw&s",
		"creationAt": "2023-11-06T15:40:49.000Z",
		"updatedAt": "2023-11-06T15:40:49.000Z"
	},
	{
		"id": 29,
		"email": "chris3@mail.com",
		"password": "12345",
		"name": "Christian2",
		"role": "admin",
		"avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTH01ZJN9-L6VYwouNWGU1mdxm8dp99gjJ2ofi8tNw&s",
		"creationAt": "2023-11-06T15:41:29.000Z",
		"updatedAt": "2023-11-06T15:41:29.000Z"
	},
	{
		"id": 30,
		"email": "chris3@mail.com",
		"password": "12345",
		"name": "Christian2",
		"role": "admin",
		"avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTH01ZJN9-L6VYwouNWGU1mdxm8dp99gjJ2ofi8tNw&s",
		"creationAt": "2023-11-06T15:44:21.000Z",
		"updatedAt": "2023-11-06T15:44:21.000Z"
	},
	{
		"id": 31,
		"email": "chris3@mail.com",
		"password": "12345",
		"name": "Christian2",
		"role": "admin",
		"avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTH01ZJN9-L6VYwouNWGU1mdxm8dp99gjJ2ofi8tNw&s",
		"creationAt": "2023-11-06T15:44:56.000Z",
		"updatedAt": "2023-11-06T15:44:56.000Z"
	},
	{
		"id": 32,
		"email": "chris3@mail.com",
		"password": "12345",
		"name": "Christian2",
		"role": "admin",
		"avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTH01ZJN9-L6VYwouNWGU1mdxm8dp99gjJ2ofi8tNw&s",
		"creationAt": "2023-11-06T15:45:32.000Z",
		"updatedAt": "2023-11-06T15:45:32.000Z"
	},
	{
		"id": 33,
		"email": "chris3@mail.com",
		"password": "12345",
		"name": "Christian2",
		"role": "admin",
		"avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTH01ZJN9-L6VYwouNWGU1mdxm8dp99gjJ2ofi8tNw&s",
		"creationAt": "2023-11-06T15:46:59.000Z",
		"updatedAt": "2023-11-06T15:46:59.000Z"
	},
	{
		"id": 34,
		"email": "chris3@mail.com",
		"password": "12345",
		"name": "Christian2",
		"role": "admin",
		"avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTH01ZJN9-L6VYwouNWGU1mdxm8dp99gjJ2ofi8tNw&s",
		"creationAt": "2023-11-06T15:47:11.000Z",
		"updatedAt": "2023-11-06T15:47:11.000Z"
	},
	{
		"id": 35,
		"email": "chris3@mail.com",
		"password": "12345",
		"name": "Christian2",
		"role": "admin",
		"avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTH01ZJN9-L6VYwouNWGU1mdxm8dp99gjJ2ofi8tNw&s",
		"creationAt": "2023-11-06T15:47:42.000Z",
		"updatedAt": "2023-11-06T15:47:42.000Z"
	},
	{
		"id": 36,
		"email": "chris3@mail.com",
		"password": "12345",
		"name": "Christian2",
		"role": "admin",
		"avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTH01ZJN9-L6VYwouNWGU1mdxm8dp99gjJ2ofi8tNw&s",
		"creationAt": "2023-11-06T15:48:05.000Z",
		"updatedAt": "2023-11-06T15:48:05.000Z"
	},
	{
		"id": 37,
		"email": "chris3@mail.com",
		"password": "12345",
		"name": "Christian2",
		"role": "admin",
		"avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTH01ZJN9-L6VYwouNWGU1mdxm8dp99gjJ2ofi8tNw&s",
		"creationAt": "2023-11-06T15:48:11.000Z",
		"updatedAt": "2023-11-06T15:48:11.000Z"
	},
	{
		"id": 38,
		"email": "chris3@mail.com",
		"password": "12345",
		"name": "Christian2",
		"role": "admin",
		"avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTH01ZJN9-L6VYwouNWGU1mdxm8dp99gjJ2ofi8tNw&s",
		"creationAt": "2023-11-06T15:49:07.000Z",
		"updatedAt": "2023-11-06T15:49:07.000Z"
	},
	{
		"id": 39,
		"email": "chris3@mail.com",
		"password": "12345",
		"name": "Christian2",
		"role": "admin",
		"avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTH01ZJN9-L6VYwouNWGU1mdxm8dp99gjJ2ofi8tNw&s",
		"creationAt": "2023-11-06T15:49:10.000Z",
		"updatedAt": "2023-11-06T15:49:10.000Z"
	},
	{
		"id": 40,
		"email": "chris3@mail.com",
		"password": "12345",
		"name": "Christian2",
		"role": "admin",
		"avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTH01ZJN9-L6VYwouNWGU1mdxm8dp99gjJ2ofi8tNw&s",
		"creationAt": "2023-11-06T15:49:14.000Z",
		"updatedAt": "2023-11-06T15:49:14.000Z"
	},
	{
		"id": 41,
		"email": "chris3@mail.com",
		"password": "12345",
		"name": "Christian2",
		"role": "admin",
		"avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTH01ZJN9-L6VYwouNWGU1mdxm8dp99gjJ2ofi8tNw&s",
		"creationAt": "2023-11-06T15:49:15.000Z",
		"updatedAt": "2023-11-06T15:49:15.000Z"
	},
	{
		"id": 42,
		"email": "chris3@mail.com",
		"password": "12345",
		"name": "Christian2",
		"role": "admin",
		"avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTH01ZJN9-L6VYwouNWGU1mdxm8dp99gjJ2ofi8tNw&s",
		"creationAt": "2023-11-06T15:50:10.000Z",
		"updatedAt": "2023-11-06T15:50:10.000Z"
	},
	{
		"id": 43,
		"email": "chris3@mail.com",
		"password": "12345",
		"name": "Christian2",
		"role": "admin",
		"avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTH01ZJN9-L6VYwouNWGU1mdxm8dp99gjJ2ofi8tNw&s",
		"creationAt": "2023-11-06T15:50:25.000Z",
		"updatedAt": "2023-11-06T15:50:25.000Z"
	},
	{
		"id": 44,
		"email": "chris3@mail.com",
		"password": "12345",
		"name": "Christian2",
		"role": "admin",
		"avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTH01ZJN9-L6VYwouNWGU1mdxm8dp99gjJ2ofi8tNw&s",
		"creationAt": "2023-11-06T15:50:37.000Z",
		"updatedAt": "2023-11-06T15:50:37.000Z"
	},
	{
		"id": 45,
		"email": "chris3@mail.com",
		"password": "12345",
		"name": "Christian2",
		"role": "admin",
		"avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTH01ZJN9-L6VYwouNWGU1mdxm8dp99gjJ2ofi8tNw&s",
		"creationAt": "2023-11-06T15:53:55.000Z",
		"updatedAt": "2023-11-06T15:53:55.000Z"
	},
	{
		"id": 46,
		"email": "chris3@mail.com",
		"password": "12345",
		"name": "Christian2",
		"role": "admin",
		"avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTH01ZJN9-L6VYwouNWGU1mdxm8dp99gjJ2ofi8tNw&s",
		"creationAt": "2023-11-06T15:53:56.000Z",
		"updatedAt": "2023-11-06T15:53:56.000Z"
	},
	{
		"id": 47,
		"email": "chris3@mail.com",
		"password": "12345",
		"name": "Christian2",
		"role": "admin",
		"avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTH01ZJN9-L6VYwouNWGU1mdxm8dp99gjJ2ofi8tNw&s",
		"creationAt": "2023-11-06T15:54:18.000Z",
		"updatedAt": "2023-11-06T15:54:18.000Z"
	},
	{
		"id": 48,
		"email": "chris3@mail.com",
		"password": "12345",
		"name": "Christian2",
		"role": "admin",
		"avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTH01ZJN9-L6VYwouNWGU1mdxm8dp99gjJ2ofi8tNw&s",
		"creationAt": "2023-11-06T15:54:47.000Z",
		"updatedAt": "2023-11-06T15:54:47.000Z"
	},
	{
		"id": 49,
		"email": "chris3@mail.com",
		"password": "12345",
		"name": "Christian2",
		"role": "admin",
		"avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTH01ZJN9-L6VYwouNWGU1mdxm8dp99gjJ2ofi8tNw&s",
		"creationAt": "2023-11-06T15:55:16.000Z",
		"updatedAt": "2023-11-06T15:55:16.000Z"
	},
	{
		"id": 50,
		"email": "chris3@mail.com",
		"password": "12345",
		"name": "Christian2",
		"role": "admin",
		"avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTH01ZJN9-L6VYwouNWGU1mdxm8dp99gjJ2ofi8tNw&s",
		"creationAt": "2023-11-06T15:55:28.000Z",
		"updatedAt": "2023-11-06T15:55:28.000Z"
	},
	{
		"id": 51,
		"email": "agustakut@gmail.com",
		"password": "agus123",
		"name": "AgusKontol",
		"role": "customer",
		"avatar": "https://ui-avatars.com/api/?name=AgusKontol",
		"creationAt": "2023-11-06T15:56:49.000Z",
		"updatedAt": "2023-11-06T15:56:49.000Z"
	},
	{
		"id": 52,
		"email": "Cdrn_19@hotmail.com",
		"password": "9618702",
		"name": "Carlos Revetti",
		"role": "customer",
		"avatar": "https://null.null/null.png",
		"creationAt": "2023-11-06T16:00:39.000Z",
		"updatedAt": "2023-11-06T16:00:39.000Z"
	}
]
`;
export default users_;

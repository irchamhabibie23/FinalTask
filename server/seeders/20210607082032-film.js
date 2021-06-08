"use strict"

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Films", [
      {
        UserId: "ffa9e36c-4fdb-4e0f-a50a-e4fa5b6a276d",
        CategoryId: 1,
        title: "Dead Pool",
        price: 99000,
        filmUrl:
          "https://static.videezy.com/system/resources/previews/000/045/146/original/stockvideo_05469.mp4",
        description:
          'Hold onto your chimichangas, folks. From the studio that brought you all 3 Taken films comes the block-busting, fourth-wall-breaking masterpiece about Marvel Comics’ sexiest anti-hero! Starring God’s perfect idiot Ryan Reynolds and a bunch of other "actors," DEADPOOL is a giddy slice of awesomeness packed with more twists than Deadpool’s enemies’ intestines and more action than prom night. Amazeballs!',
        thumbnail: "1623038010615-Deadpool_(2016_poster).png",
        backdrop: "1623038010619-Rectangle2.svg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        UserId: "ffa9e36c-4fdb-4e0f-a50a-e4fa5b6a276d",
        CategoryId: 2,
        title: "Godzila vs Kong",
        price: 30000,
        filmUrl:
          "https://static.videezy.com/system/resources/previews/000/006/898/original/Labv28.mp4",
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        thumbnail: "1623032679501-Rectangle4.svg",
        backdrop: "1623032679508-Godzilla1.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        UserId: "ffa9e36c-4fdb-4e0f-a50a-e4fa5b6a276d",
        CategoryId: 2,
        title: "Spiderman 3",
        price: 50000,
        filmUrl:
          "https://static.videezy.com/system/resources/previews/000/000/169/original/IndustrySmokeFire.mp4",
        description:
          'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.',
        thumbnail: "1623038276336-Rectangle3.svg",
        backdrop: "1623038276338-spiderman-3-logo-wallpapers-hd.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        UserId: "ffa9e36c-4fdb-4e0f-a50a-e4fa5b6a276d",
        CategoryId: 1,
        title: "Tom and Jerry The Movie (2021)",
        price: 30000,
        filmUrl:
          "https://static.videezy.com/system/resources/previews/000/010/991/original/La_Brea_Tar_Pits_6.mp4",
        description:
          "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
        thumbnail: "1623038569241-Rectangle5.svg",
        backdrop: "1623038569245-tom-and-jerry.jpeg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        UserId: "ffa9e36c-4fdb-4e0f-a50a-e4fa5b6a276d",
        CategoryId: 3,
        title: "The Meg",
        price: 60000,
        filmUrl:
          "https://static.videezy.com/system/resources/previews/000/001/599/original/Beach_6.mp4",
        description:
          '"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"',
        thumbnail: "1623038702566-Rectangle8.svg",
        backdrop: "1623038702572-maxresdefault.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        UserId: "ffa9e36c-4fdb-4e0f-a50a-e4fa5b6a276d",
        CategoryId: 5,
        title: "Lord of the Rings : The Fellowship of the Ring",
        price: 25000,
        filmUrl:
          "https://static.videezy.com/system/resources/previews/000/045/146/original/stockvideo_05469.mp4",
        description:
          '"But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?"',
        thumbnail: "1623038988945-Rectangle9.svg",
        backdrop:
          "1623038988948-https___cdn.cnn.com_cnnnext_dam_assets_200513123438-01-frodo-baggins-elijah-wood.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
}

# Configuração React Native

1) Navegue até a pasta <i>react</i>.

2) No terminal, execute o seguinte comando para baixar as dependências do projeto:

> yarn

3) Agora, com o dispositivo conectado, execute o comando:

> yarn android

4) Com o aplicativo em funcionamento, acessa o arquivo <i>react/App.js</i> e, na linha 60, subtitua o <i>ip</i> pelo seu <i>ip</i> local, sem alterar a porta 4000.

5) No aplicativo em funcionamento, clique no botão "INICIAR TRANSMISSÃO". A imagem da sua câmera deve cobrir toda a tela.

# Configuração Socket

1) Navegue até a pasta <i>server-js</i>.

2) No terminal, execute o seguinte comando para baixar as dependências do projeto:

> npm install

3) Agora, execute o seguinte comando para iniciar o socket:

> node index.js

4) Se tudo der certo, deve aparecer a mensagem <i>Servidor rodando na porta 4000</i> sem erros.

# Configuração Browser

1) Navegue até a pasta <i>browser</i>.

2) No arquivo <i>index.html</i>, na linha 30, subtitua o <i>ip</i> pelo seu <i>ip</i> local, sem alterar a porta 4000.

3) Instale as bibliotecas que serão necessárias para executar o arquivo python:

> pip install opencv-python

> pip install selenium

> pip install Pillow

> pip install mss

> pip install numpy

4) No arquivo <i>app.py</i>, na linha 13, adicione o endereço do arquivo <b>index.html</b>.

5) Execute o seguinte comando ainda na pasta <i>browser</i>:

> python app.py

6) Deve ser aberto o navegador Chrome (certifique-se de tê-lo em seu computador) e, em seguida, exibida a imagem da câmera do dispositivo onde está o aplicativo React Native está sendo executado.
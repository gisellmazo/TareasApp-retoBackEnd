module.exports = {
    entry: './src/client/index.js',
    output: {
        path: __dirname + '/src/public',
        filename: 'bundle.js'
    },
    module:{
        rules:[
            {
                use: 'babel-loader',
                test:/\.js$/,
                exclude: /node_modules/
            },
            {
                test: /\.(sass|css)$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
                use: ['url-loader', 'file-loader'],
                options: {
                    limit: 4096,
                    name: '../fonts/[name].[ext]', // was '/fonts/[name].[ext]?[hash]',
                  } 
            }
            
        ]
    }
};
import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'

export class News extends Component {

    static defaultProps = {
        country: 'in',
        pageSize: 5,
        category: 'general'

    }

    static propTypes = {
      country: PropTypes.string,
      pageSize: PropTypes.number,
      category: PropTypes.string
    }
    
    constructor(){
        super();
        this.state={
            articles: [],
            loading: false,
            page: 1
        }
    }

    async updateNews(){
        console.log("cdm");
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3eebcc1a13e449c2807322d36c1a4870&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({loading: true});
        let data = await fetch(url);
        let parsedData = await data.json()
        console.log(parsedData);
        this.setState({
          articles: parsedData.articles,
          totalResults: parsedData.totalResults,
          loading: false,
        })
    }

    async componentDidMount(){
        console.log("cdm");
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3eebcc1a13e449c2807322d36c1a4870&page=1&pageSize=${this.props.pageSize}`;
        this.setState({loading: true});
        let data = await fetch(url);
        let parsedData = await data.json()
        console.log(parsedData);
        this.setState({
          articles: parsedData.articles,
          totalResults: parsedData.totalResults,
          loading: false,
        })
    }

    handlePreviousClick= async ()=>{
        console.log("Previous");
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3eebcc1a13e449c2807322d36c1a4870&page=${this.state.page -1}&pageSize=${this.props.pageSize}`;
        // this.setState({loading: true});
        // let data = await fetch(url);
        // let parsedData = await data.json()
        // console.log(parsedData);
        // this.setState({
        //   articles: parsedData.articles,
        //   page: this.state.page - 1,
        //   loading: false,

        // })
        this.setState({page: this.state.page - 1 });
        this.updateNews();
      }
      
    handleNextClick= async ()=>{
        // console.log("Next");
        //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3eebcc1a13e449c2807322d36c1a4870&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
        //     this.setState({loading: true});
        //     let data = await fetch(url);
        //     let parsedData = await data.json()
        //     this.setState({
        //       articles: parsedData.articles,
        //       page: this.state.page + 1,
        //       loading: false,
        //     }) 
        this.setState({page: this.state.page + 1 });
        this.updateNews();

      }

    render() {

    console.log("render")
        
    return (
        <div className='container my-3'>
            <h1 className="text-center" style={{margin: 30}}>News Monkey - Top {this.props.category} Headlines</h1>
            {this.state.loading && <Spinner/>}
            <div className="row">
            {!this.state.loading && this.state.articles.map((element)=>{
                return <div className="col-md-3" key={element.url}>
                      <NewsItem title= {element.title?element.title:""} description = {element.description?element.description:""} imageUrl= {element.urlToImage} newsUrl = {element.url} author={element.author?element.author:"Unknown"} date={element.publishedAt} source={element.source.name}  />
                </div>
            })}
            </div>
            <div className="container d-flex justify-content-between">
            <button disabled={this.setState.page <=1} type="button" className="btn btn-dark" onClick={this.handlePreviousClick}>&larr; Previous</button>
            <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
            </div>
        </div>
    )
  }
}

export default News
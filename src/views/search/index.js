import React, { useEffect, useContext, useState } from 'react';
import { useSelector, useDispatch } from "react-redux"
import { useHistory } from 'react-router-dom'
import { AppContext } from '../../App';
import './index.scss'
import Typesense from 'typesense'
import { useTranslation } from 'react-i18next';
import InfiniteScroll from 'react-infinite-scroll-component';

  var typesense = new Typesense.Client({
    'nodes': [
      {
        'host': 'search.trufflear.com',
        'port': '8108',
        'protocol': 'https'
      }],
    'apiKey': 'qCA8wbBBZQPe2aXZYAaM4Yfl0WsfaPDF',
    'numRetries': 3, // A total of 4 tries (1 original try + 3 retries)
    'connectionTimeoutSeconds': 10,
    'retryIntervalSeconds': 0.1,
    'healthcheckIntervalSeconds': 2,
    'logLevel': 'debug'
  })

  const {InfluencerPublicProfileServiceClient} = require('../../network/services/influencer_public_profile_service_grpc_web_pb');

  const {GetInfluencerPublicProfileRequest} = require('../../network/services/influencer_public_profile_service_pb');

  var client = new InfluencerPublicProfileServiceClient('https://api.trufflear.com:8080/', null, null);



export default function SearchPage(props){
    //Initial Config
    const dispatch = useDispatch();
    const history = useHistory();
    const { t, i18n } = useTranslation();
    // States 
    const [searchFocus, setSearchFocus] = useState(0)
    const [searchKey, setSearchKey] = useState('')
    const [bio, setBio] = useState('')
    const [user, setUser] = useState('')
    const [email, setEmail] = useState('team@trufflear.m')
    const [category, setCategory] = useState('')
    const [searchList, setSearchList] = useState([])
    const [avatar, setAvatar] = useState('/img/default_profile.png')
    const [isShowTitle, setShowTitle] = useState(true)
    const [lastTime, setTime] = useState(0)
    // Contexts sets
    const appConstants = useContext(AppContext);
    const [tooltipIsOpen, setTooltipIsOpen] = useState(false);

    const handleChange = e => {
        if(Date.now() - lastTime < 150) {
            console.log('debounce============')
            return;
        }
        let val = e.target.value
        setTime(Date.now())
        searchReq(val)
        setSearchKey(val)
    }

    const searchReq = (val,em=null,isInfinite=false) => {
        let myEmail;
        if(em) {
            myEmail = em;
        } else {
            myEmail = email
        }
        typesense.collections(myEmail).documents().search({
            'q': val?val:'*',
            'query_by': 'hashtags,mentions,caption',
            'sort_by': 'created_at_time_millis:desc',
            'highlight_affix_num_tokens': 3,
            'per_page': '50'
        }).then(function (searchResults) {
            console.log(searchResults.hits)
            if(isInfinite) {
                setSearchList(...searchList, ...searchResults.hits)
            } else {
                setSearchList(searchResults.hits)
            }
        }).catch(function (error) {
            console.log('oh, my error')
        })
    }

    const handleSelect = value => {
        let realValue = value.replace(/<mark>/g,'').replace(/<\/mark>/g,'')
        searchReq(realValue)
        setSearchKey(realValue)
        setSearchFocus(2)
    }

    const handleMask = e => {
        let inputVal = document.getElementById('search-input').value
        if(inputVal) setSearchFocus(2)
        else {
            setShowTitle(true)
            setSearchFocus(0)
        }
    }

    const handleFocus = e => {
        setSearchFocus(1)
        if(isShowTitle) setShowTitle(false)
    }

    useEffect(() => {
        if (navigator.userAgent.indexOf("Instagram") !== -1) {
            if(window.navigator.userAgent.match(/Android/i) || window.navigator.userAgent.match(/iphone/i)) {
                setTooltipIsOpen(true)   
                setTimeout(()=>{setTooltipIsOpen(false)},3000) 
            } else {
                setTooltipIsOpen(false)
            }
        } else {
            setTooltipIsOpen(false)
        }

        var request = new GetInfluencerPublicProfileRequest();
        document.title = `${props.match.params.username} | Trufflear`
        //request.setUsername(props.match.params.username)
        request.setUsername('oyster_bamboo');
        client.getInfluencerPublicProfile(request, {}, (err, response) => {
            if(response.getError()) {
              console.error('getInfluencer error', response.getError())
              let errorType = response.getError().getErrorType()
              if(errorType == 2) {
                history.push('/error_2')
              } else {
                history.push('/error_1')
              }
            }
            if(response.getSuccess()) {
                console.log('response',response.getSuccess().getProfile());
                let profile = response.getSuccess().getProfile()
                console.log('bioDiscription', profile.getBioDescription())
                console.log('categorytitle', profile.getCategoryTitle())
                console.log('profileurl', profile.getProfilePicUrl())
                console.log('profileutitle', profile.getProfileTitle())
                console.log('email', profile.getEmail())
                setBio(profile.getBioDescription())
                setCategory(profile.getCategoryTitle())
                setUser(profile.getProfileTitle())
                searchReq('*', profile.getEmail())
                setEmail(profile.getEmail())
                let profilePicUrl = profile.getProfilePicUrl();
                if(profilePicUrl && profilePicUrl != '') {
                    setAvatar(profile.getProfilePicUrl())
                } else {
                    setAvatar('/img/default_profile.png')
                }
            }
          });
    }, [])


    return(
        <>
            {searchFocus == 1 && (
                <div className='mask' onClick={handleMask}>
                </div>
            )} 
            {tooltipIsOpen == true && (
                <div className='tooltip'>
                    <div className='tooltip-close-box'><button className='tooltip-close'><p>x</p></button></div>
                    <p className='tooltip-content'>This is a tool tip</p>
                </div>
            )}
            
            <div className='search-container'>
                
                <div className='main-container'>
                    <InfiniteScroll dataLength={searchList.length} next={()=>{searchReq(searchKey,null,true)}} hasMore={true} loader={<h3 style={{color:"white", margin:"20px 0px"}}>Loading...</h3>}>
                    {isShowTitle && (
                        <h4>{t('search')}</h4>
                    )}
                    <div className='searchbox-main'>
                        <img src='/img/search.svg'></img>
                        <div className='searchbox'>
                            <input id='search-input' onChange={handleChange} value={searchKey} className='searchbox-input' onFocus={handleFocus}></input>
                        </div>
                        {searchFocus == 1 && (
                            <ul className='hits-list'>
                                {
                                    searchList.map(hit => {
                                        if(hit && hit.highlights && hit.highlights.length && hit.highlights[0].snippet) {
                                            let content = hit.highlights[0].snippet
                                            return (<li className='hits-item' onClick={()=>handleSelect(content)} dangerouslySetInnerHTML={{ __html: content }} ></li>)     
                                        } else {
                                            if(hit.document.caption) {
                                                let content = hit.document.caption
                                                return (<li className='hits-item' onClick={()=>handleSelect(content)} dangerouslySetInnerHTML={{ __html: content }} ></li>)     
                                            }
                                        }
                                    })
                                }
                            </ul>
                        )} 
                    </div>
                
                    <div className='search-result no-margin'>
                        {isShowTitle && (
                            <div className='restaurant-section'>
                                <div className='restaurant-avatar'>
                                    <img src={avatar}></img>
                                </div>
                                <div className='restaurant-info'>
                                    <p className='info-one'>{user}</p>
                                    <p className='info-two'>{category}</p>
                                    <p className='info-three'>{bio}</p>
                                </div>
                            </div>
                        )}
                        <div className='search-list'>     
                                {searchList.map(hit => {
                                    if(hit && hit.highlights && hit.highlights.length && hit.highlights[0].snippet) {
                                        let content = hit.highlights[0].snippet
                                        return (
                                            <div className='search-item cursor-pointer' onClick={()=>{window.location.href = hit.document.permalink}}>
                                                <img className='item-img' src={hit.document.thumbnail_url}></img>
                                                <div className='item-info'>
                                                    <div className='item-cap'>
                                                        <p className='main-cap' dangerouslySetInnerHTML={{ __html: content }}></p>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    } else {
                                        if(hit.document.caption) {
                                            let content = hit.document.caption
                                            return (
                                                <div className='search-item cursor-pointer' onClick={()=>{window.location.href = hit.document.permalink}}>
                                                    <img className='item-img' src={hit.document.thumbnail_url}></img>
                                                    <div className='item-info'>
                                                        <div className='item-cap'>
                                                            <p className='main-cap' dangerouslySetInnerHTML={{ __html: content }}></p>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    }
                                })} 
                        </div>
                    </div>
                </InfiniteScroll>
                </div>
            </div>
     
        </>
    )
}
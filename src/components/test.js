import React, { Component } from 'react'

export default class AppHeader extends Component {
    render() {
        return (
            <>
            <div className='ui container'>
                
                {/* HEADINGS
                <h1 className='ui header small'>heading 1</h1>
                <h2 className='ui header large'>heading 2</h2>
                <h3 className='ui header tiny'>heading 3</h3>
                <h4>heading 4</h4>
                <h5>heading 5</h5>
                <h6>heading 6</h6>
                */}

                {/* BUTTONS
                <button className='ui button '>Click here!</button>
                <button className='ui button primary'>Click here!</button>
                <button className='ui button secondary'>Click here!</button>
                <button className='ui button positive'>Click here!</button>
                <button className='ui button negative'>Click here!</button>
                <button className='ui button purple'>Click here!</button>
                <button className='ui button basic red'>Click here!</button>
                <hr />
                <button className='ui button red fluid'>Click here!</button>
                <hr />
                <button className='ui icon button'>
                    <i className='cloud icon' />
                </button>
                <hr />
                <div className='ui buttons'>
                    <button className='ui button'>One</button>
                    <button className='ui button'>Two</button>
                    <button className='ui button'>Three</button>
                </div>
                */}
                {/* more classes for buttons: circular disabled loading miny tiny massive large */}
                
                {/* ICONS
                <i class="american sign language interpreting icon"></i>
                <i class="assistive listening systems icon"></i>
                <i class="audio description icon"></i>
                <i class="blind icon"></i>
                <i class="braille icon"></i>
                <i class="closed captioning icon"></i>
                <i class="closed captioning outline icon"></i>
                <i class="deaf icon"></i>
                <i class="low vision icon"></i>
                */}

                {/* BREADCRUMB
                <div class="ui breadcrumb">
                    <a class="section">Home</a>
                    <div class="divider"> / </div>
                    <a class="section">Store</a>
                    <div class="divider"> / </div>
                    <div class="active section">T-Shirt</div>
                </div>
                */}

                {/* LISTS
                <div class="ui list">
                    <div class="item">Apples</div>
                    <div class="item">Pears</div>
                    <div class="item">Oranges</div>
                </div>

                <div class="ui horizontal celled list">
                    <div class="item">Apples</div>
                    <div class="item">Pears</div>
                    <div class="item">Oranges</div>
                </div>
                */}


                {/* FORMS
                <form class="ui form">
                    <div class="field">
                        <label>First Name</label>
                        <input type="text" name="first-name" placeholder="First Name"/>
                    </div>
                    <div class="field">
                        <label>Last Name</label>
                        <input type="text" name="last-name" placeholder="Last Name"/>
                    </div>
                    <div class="field">
                        <div class="ui checkbox">
                            <input type="checkbox" tabindex="0" class="hidden"/>
                            <label>I agree to the Terms and Conditions</label>
                        </div>
                    </div>
                    <button class="ui button" type="submit">Submit</button>
                </form>
                */}

                {/* MESSAGES
                <div className='ui message'>
                    <div className='header'>
                        Some Message
                    </div>
                    <p>This is a message.</p>
                </div>
                <div className='ui message error'>
                    <div className='header'>
                        Some Message
                    </div>
                    <p>This is a message.</p>
                </div>
                <div className='ui message success'>
                    <div className='header'>
                        Some Message
                    </div>
                    <p>This is a message.</p>
                </div>
                <div className='ui message purple'>
                    <div className='header'>
                        Some Message
                    </div>
                    <p>This is a message.</p>
                </div>
                */}

                {/* TABLES
                <table class="ui celled table">
                <thead>
                    <tr><th>Name</th>
                    <th>Age</th>
                    <th>Job</th>
                </tr></thead>
                <tbody>
                    <tr>
                    <td data-label="Name">James</td>
                    <td data-label="Age">24</td>
                    <td data-label="Job">Engineer</td>
                    </tr>
                    <tr>
                    <td data-label="Name">Jill</td>
                    <td data-label="Age">26</td>
                    <td data-label="Job">Engineer</td>
                    </tr>
                    <tr>
                    <td data-label="Name">Elyse</td>
                    <td data-label="Age">24</td>
                    <td data-label="Job">Designer</td>
                    </tr>
                </tbody>
                </table>
                */}

                {/* SEGMENTS
                <div class="ui segment">
                    <p>Its a paragraph. Its a paragraph. Its a paragraph. Its a paragraph. Its a paragraph. Its a paragraph. Its a paragraph. Its a paragraph. Its a paragraph. Its a paragraph. Its a paragraph. Its a paragraph. Its a paragraph. </p>
                </div>
                <div class="ui segment green">
                    <p>Its a paragraph. Its a paragraph. Its a paragraph. Its a paragraph. Its a paragraph. Its a paragraph. Its a paragraph. Its a paragraph. Its a paragraph. Its a paragraph. Its a paragraph. Its a paragraph. Its a paragraph. </p>
                </div>
                */}

                {/* ITEM
                <div className='ui card'>
                    <div className='content'>
                        <div className='header'>
                            Content Block
                        </div>
                        <div className='meta'>
                            Meta info
                        </div>
                    </div>
                    <div className='content'>
                        <p>Its a paragraph</p>
                    </div>
                    <div className='content extra'>
                        <button className='ui button'>
                            Click Here
                        </button>
                    </div>
                </div>
                */}

                {/* SEMANTIC USES 16 COLUMN GRID
                <div className='ui grid'>
                    <div className='row'>
                        <div className='column'>
                            <button className='ui button '>
                                Button 1
                            </button>
                        </div>
                        <div className='column'>
                            <button className='ui button '>
                                Button 2
                            </button>
                        </div>
                        <div className='column'>
                            <button className='ui button '>
                                Button 3
                            </button>
                        </div>
                    </div>
                    <div className='column'>
                        <button className='ui button '>
                            Button 4
                        </button>
                    </div>
                    <div className='column'>
                        <button className='ui button '>
                            Button 5
                        </button>
                    </div>
                    <div className='column'>
                        <button className='ui button '>
                            Button 6
                        </button>
                    </div>
                    <div className='column'>
                        <button className='ui button '>
                            Button 7
                        </button>
                    </div>
                    <div className='column'>
                        <button className='ui button '>
                            Button 8
                        </button>
                    </div>
                    <div className='column'>
                        <button className='ui button '>
                            Button 9
                        </button>
                    </div>
                    <div className='column '>
                        <button className='ui button '>
                            Button 10
                        </button>
                    </div>
                </div> */}
            </div>
            </>
        )
    }
}

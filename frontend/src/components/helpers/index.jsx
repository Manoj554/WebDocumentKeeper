import {Card} from 'react-bootstrap';

export const selectTag = (sel,height,view) => {
    let mimetype = sel.mimetype;
    let type = mimetype.substring(0,mimetype.lastIndexOf('/'));

    if(type === "image" ){
        return (
            <Card.Img variant="top" src={sel.docurl} width="100%" height={height} />
        )
    }else{
    
        return(
            <embed src={`${sel.docurl}#toolbar=0&navpanes=0&scrollbar=0&statusbar=0&view=${view}`} type={sel.mimetype} height={height} width="100%" />
        )
    }
}
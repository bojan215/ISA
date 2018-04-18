package ftn.isa2018.controller;


import ftn.isa2018.model.Message;
import ftn.isa2018.model.RegUser;

import ftn.isa2018.service.RegUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;



@RestController
public class RegUserController {

    @Autowired
    private RegUserService regUserService;

    @RequestMapping(value = "/getFriends/{id}", method = RequestMethod.GET)
    public ResponseEntity<List<RegUser>> getFriends(@PathVariable("id") Long id){
    	RegUser user = regUserService.findOne(id);
        List<RegUser> ret = user.getFriendList();
        return new ResponseEntity<List<RegUser>>(ret, HttpStatus.OK);
    }
    
    @MessageMapping("/searchFriends/{id}")
    @SendTo("/topic/searchFriends/{id}")
    public List<RegUser> searchFriends(@DestinationVariable Long id, Message person){
    	RegUser user = regUserService.findOne(id);
        List<RegUser> friends = new ArrayList<RegUser>();
        String[] splitNameSurname = person.getMessage().split(" ");
        if(splitNameSurname.length != 2){
            for (String nameSurname : splitNameSurname){
                for(RegUser friend : user.getFriendList()){
                    if(friend.getName().equals(nameSurname) || friend.getSurname().equals(nameSurname))
                        friends.add(friend);
                }
            }
        }else{
            for(RegUser friend : user.getFriendList()){
                if((friend.getName().equals(splitNameSurname[0]) && friend.getSurname().equals(splitNameSurname[1])) || (friend.getName().equals(splitNameSurname[1]) && friend.getSurname().equals(splitNameSurname[0]))){
                    friends.add(friend);
                }
            }
        }

        return friends;
    }
    
    @MessageMapping("/searchPersons/{id}")
    @SendTo("/topic/persons/{id}")
    public List<RegUser> searchPersons(@DestinationVariable Long id, Message person){
        List<RegUser> userList = new ArrayList<RegUser>();
        RegUser user = regUserService.findOne(id);
        String[] splitNameSurname = person.getMessage().split(" ");
        if(splitNameSurname.length != 2){
            for(String nameSurname : splitNameSurname){
                ArrayList<RegUser> personsByName = (ArrayList<RegUser>) regUserService.findByName(nameSurname);
                ArrayList<RegUser> personsBySurname = (ArrayList<RegUser>) regUserService.findBySurname(nameSurname);
                for(RegUser guest : personsByName){
                    if(!user.getFriendList().contains(guest) && !user.getSentList().contains(guest) && !user.getPendingList().contains(guest) && !userList.contains(guest) && (user.getId() != guest.getId()))
                    	userList.add(guest);
                }
                for(RegUser guest : personsBySurname){
                    if(!user.getFriendList().contains(guest) && !user.getSentList().contains(guest) && !user.getPendingList().contains(guest) && !userList.contains(guest) && (user.getId() != guest.getId()))
                    	userList.add(guest);
                }
            }
        }else{
            ArrayList<RegUser> personsByNameAndSurname = (ArrayList<RegUser>) regUserService.findByNameAndSurname(splitNameSurname[0], splitNameSurname[1]);
            ArrayList<RegUser> personsBySurnameAndName = (ArrayList<RegUser>) regUserService.findByNameAndSurname(splitNameSurname[1], splitNameSurname[0]);
            for(RegUser guest : personsByNameAndSurname){
                if(!user.getFriendList().contains(guest) && !user.getSentList().contains(guest) && !user.getPendingList().contains(guest) && !userList.contains(guest) && (user.getId() != guest.getId()))
                	userList.add(guest);
            }
            for(RegUser guest : personsBySurnameAndName){
                if(!user.getFriendList().contains(guest) && !user.getSentList().contains(guest) && !user.getPendingList().contains(guest) && !userList.contains(guest) && (user.getId() != guest.getId()))
                	userList.add(guest);
            }
        }

        return userList;
    }
    
    @MessageMapping("/addFriend/{id}/{friendId}")
    @SendTo("/topic/friendRequest/{friendId}")
    public int addFriend(@DestinationVariable Long id, @DestinationVariable Long friendId){
        RegUser user = regUserService.findOne(id);
        RegUser friend = regUserService.findOne(friendId);
        user.getSentList().add(friend);
        friend.getPendingList().add(user);
        regUserService.save((RegUser)user);
        regUserService.save((RegUser)friend);

        return friend.getPendingList().size();
    }

    @MessageMapping("/acceptFriendRequest/{friendId}/{id}")
    @SendTo("/topic/friendAcceptedRequest/{id}")
    public RegUser acceptFriendRequest(@DestinationVariable Long friendId, @DestinationVariable Long id){
    	RegUser user = regUserService.findOne(id);
    	RegUser friend = regUserService.findOne(friendId);

        user.getSentList().remove(friend);
        user.getFriendList().add(friend);
        friend.getPendingList().remove(user);
        friend.getFriendList().add(user);
        regUserService.save((RegUser)user);
        regUserService.save((RegUser)friend);

        return friend;
    }

    @MessageMapping("/deleteFriend/{id}/{friendId}")
    @SendTo("/topic/deleteFriend/{friendId}")
    public RegUser deleteFriend(@DestinationVariable Long id, @DestinationVariable Long friendId){
    	RegUser user = regUserService.findOne(id);
    	RegUser friend = regUserService.findOne(friendId);

        user.getFriendList().remove(friend);
        friend.getFriendList().remove(user);
        regUserService.save(user);
        regUserService.save(friend);

        return user;
    }

    @RequestMapping(value = "/ignoreFriendRequest/{friendId}/{id}")
    public ResponseEntity<Long> ignoreFriendRequest(@PathVariable("friendId") Long friendId, @PathVariable("id") Long id){
    	RegUser user = regUserService.findOne(id);
    	RegUser friend = regUserService.findOne(friendId);

        user.getSentList().remove(friend);
        friend.getPendingList().remove(user);
        regUserService.save((RegUser)user);
        regUserService.save((RegUser)friend); 

        return new ResponseEntity<Long>(user.getId(), HttpStatus.OK);
    }
	
    @RequestMapping(value = "/getFriendRequestsNumber/{id}", method = RequestMethod.GET)
    public ResponseEntity<Integer> getFriendRequestsNumber(@PathVariable("id") Long id){
        RegUser user = regUserService.findOne(id);
        return new ResponseEntity<Integer>(user.getPendingList().size(), HttpStatus.OK);
    }

    @RequestMapping(value = "/getFriendRequests/{id}", method = RequestMethod.GET)
    public ResponseEntity<List<RegUser>> getFriendRequests(@PathVariable("id") Long id){
    	RegUser user = regUserService.findOne(id);
        List<RegUser> friendRequests = user.getPendingList();
        return new ResponseEntity<List<RegUser>>(friendRequests, HttpStatus.OK);
    }
}

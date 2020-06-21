import React from 'react';
import './navigation.scss';
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import BrightnessHighIcon from '@material-ui/icons/BrightnessHigh';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import GradeIcon from '@material-ui/icons/Grade';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import HowToRegIcon from '@material-ui/icons/HowToReg';
function navigation() {
  return (
    <ul id="left-panel" class="left-panel">
    <li>
      <div class="navheading">
        <mat-icon mat-list-icon class="logo">
          <BrightnessHighIcon/>
          </mat-icon>
        <span class="navtitle">Paywheel</span>
      </div>
    </li>
    <li>
      <div class="list">
       <mat-icon mat-list-icon><HomeIcon/></mat-icon>
        <span class="title">Dashboard</span>
      </div>
    </li>
    <li>
      <div id="employee" class="list" >
        <mat-icon mat-list-icon><PersonIcon/></mat-icon>
        <span id="selectedoption" class="title">Employee services</span>
      </div>
      <i class="material-icons menu-arrow">play_arrow</i>
  
      <ul id="emp" class="secondexpansion">
        <li>
          <div class="list">
            <span class="enable">Attendance</span>
          </div>
        </li>
        <li>
          <div class="list">
            <span routerLinkActive  class="enable">Apply for leave</span>
          </div>
        </li>
        <li>
          <div class="list">
  
            <span routerLinkActive  class="enable">Offsite</span>
          </div>
        </li>
        <li>
          <div class="list" >
            <span routerLinkActive  class="enable"  >Reimbursment</span>
          </div>
        </li>
        <li>
          <div class="list" >
            <span routerLinkActive  class="enable" >Investment</span>
          </div>
        </li>
      </ul>
    </li>
    <li >
      <div  class="list">
        <mat-icon mat-list-icon><SupervisorAccountIcon/></mat-icon>
        <span class="title">Manager Services</span>
      </div>
    </li>
    <li>
      <div class="list">
        <mat-icon mat-list-icon><PermIdentityIcon/></mat-icon>
        <span class="disable">Profile</span>
      </div>
    </li>
    <li>
      <div class="list" >
        <mat-icon mat-list-icon><ExitToAppIcon/></mat-icon>
        <span class="title">Appraisal Management</span>
      </div>
    </li>
    <li >
      <div class="list" >
        <mat-icon mat-list-icon><GradeIcon/></mat-icon>
        <span class="title">Previous Version</span>
      </div>
    </li>
    <li>
      <div class="list" >
        <mat-icon mat-list-icon><SupervisedUserCircleIcon/></mat-icon>
        <span class="title">Admin Services</span>
      </div>
    </li>
    <li>
      <div class="list">
        <mat-icon mat-list-icon><HowToRegIcon/></mat-icon>
        <span class="title">HR Services</span>
      </div>
    </li>
  </ul>
  );
}

export default navigation;
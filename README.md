# Project Documentation

## Table of Contents
1. [Introduction](#introduction)
   - [Background](#background)
   - [Problem Statement](#problem-statement)
   - [Objectives](#objectives)
   - [Scope and Limitation](#scope-and-limitations)
   - [Development Methodology](#development-methodology)
2. [Background Study and Literature Review](#background-study-and-literature-review)
3. [System Analysis](#system-analysis)
   - [System Analysis Overview](#system-analysis-overview)
     - [Requirement Analysis](#requirement-analysis)
       - [Functional Requirements](#functional-requirements)
       - [Use Case Diagram](#use-case-diagram)
       - [Non-Functional Requirements](#non-functional-requirements)
     - [Feasibility Analysis](#feasibility-analysis)
4. [System Design](#system-design)
   - [Design](#design)
   - [Algorithm](#algorithm)
5. [Implementation and Testing](#implementation-and-testing)
   - [Implementation](#implementation)
     - [Tools Used](#tools-used)
   - [Testing](#testing)
     - [Unit Testing](#unit-testing)
     - [System Testing](#system-testing)
6. [Conclusion](#conclusion)
7. [References](#references)  

## Introduction
### Background

## Deal Shield

A deal shield is a third-party arrangement where funds are held and disbursed based on agreed conditions. 

In this project, the escrow system secures payments until services or products are delivered as promised. This protects consumers by ensuring they pay only when satisfied and guarantees providers payment upon successful completion.

**Benefits:**
- **Consumers:** Payment held securely until satisfaction.
- **Providers:** Guaranteed payment and access to a wider audience through a bidding system.



## Problem Statement

With the rise of online markets, safe and reliable transaction mechanisms are increasingly needed. Current online transactions often lack transparency and trust, posing risks for both consumers and providers.

**Consumer Challenges:**
- Risk of fraud from service providers delivering subpar or undelivered goods/services.
- Insufficient protection against fraudulent charges and data breaches with traditional payment systems.

**Provider Obstacles:**
- Risk of non-payment for delivered goods or services.
- Financial losses from chargebacks and disputes.

These issues hinder the growth and trustworthiness of online marketplaces.

## Objectives

**Main Goal:**
Create a secure platform using escrow services to bridge the trust gap in online transactions, ensuring safety and transparency for both consumers and providers.

**General Objectives:**
- Develop a user-friendly and secure platform that fosters trust in online transactions.

**Specific Objectives:**
- Allow consumers to post detailed orders.
- Enable providers to bid on orders.
- Let consumers select the best provider based on bids and profiles.
- Incorporate a secure payment system holding funds until order completion.

## Scope and Limitations

**Scope:**
- Order creation and management.
- Competitive bidding system.
- Escrow service for secure transactions.
- Basic dispute resolution mechanism.

**Limitations:**
- Initial focus on a simple dispute resolution process; complex scenarios may require further development.
- Initial integration with Stripe and Khalti; additional payment methods may be explored later.
- Basic security features initially, with advanced options like two-factor authentication considered for future updates.


## Development Methodology

**Incremental Development Approach:**


<img width="488" alt="incremental-development" src="https://github.com/user-attachments/assets/e4d58970-6659-4f36-a7da-d4ba298c07e8">

The incremental development strategy will be used for our escrow platform. This approach offers several benefits:

- **Early Value Delivery:** Functional features are released in periodic increments, allowing users to interact with the platform and provide feedback.
- **Improved Alignment:** Iterative development helps align the platform with real-world needs and expectations.
- **Risk Management and Flexibility:** Breaking development into manageable parts helps identify and address issues early, reducing costly rework and accommodating changing requirements.

This approach enhances platform agility and adaptability in the dynamic e-commerce and finance sectors.

## Background study and Literature Review

Several studies highlight the challenges associated with trust in online transactions[1]. Consumers face the risk of fraudulent service providers or subpar products. Unsecured payment systems can expose them to data breaches or unauthorized charges[2]. Providers can also be victims of non-payment by consumers after completing services, hindering trust in online marketplaces[3].

Research suggests that online escrow services play a crucial role in establishing trust between transacting parties[4]. The report “Decentralised Escrow Protocol that Facilitates Secure Transactions between Trustless Parties” demonstrates that escrow can significantly reduce transaction risks for both consumers and providers[3]. By holding payment in a secure account until order fulfillment, escrow services mitigate the risk of non-payment for providers and ensure consumers receive the product or service before releasing funds.

Trust is critical for success in online commerce[1]. In a survey of 6000 customers, trust in e-commerce platforms was valued more than price[1]. However, only a small number of users trusted these platforms, especially when privacy and security were at risk[1].

Online escrow services enhance trust in e-commerce transactions[3]. They provide a secure third-party platform where money changes hands safely between buyers and sellers. Funds are not released to the seller until the deal terms are met, known as the “inspection period”[3], protecting buyers from fraud.

In case of a dispute, the transaction enters a dispute process if the consumer is unsatisfied with the order[3]. This process involves a 5-day Negotiation Period and a 5-day Arbitration Commencement Period[3], allowing buyers and sellers to resolve their dispute without third-party intervention. These mechanisms enhance platform security and trustworthiness.

Online escrow platforms like Escrow.com and Upwork provide a safe trading environment in the e-commerce sector[4]. Despite their benefits, trust and robust dispute resolution mechanisms remain critical for platform selection.


## System Analysis

**System Analysis Overview:**
System analysis involves gathering and interpreting facts to diagnose problems and recommend improvements. It requires intensive communication between users and developers, focusing on understanding the system in detail, including inputs, processes, and outputs.

### Requirement Analysis

**Functional Requirements:**
- **User Registration and Login:** Secure accounts for consumers and providers.
- **Order Creation:** Consumers can detail their service or product needs.
- **Order Browsing:** Providers can find orders based on their expertise.
- **Bid Submission:** Providers can submit bids with details and pricing.
- **Bid Review:** Consumers can review and compare bids and profiles.
- **Provider Selection:** Consumers choose the best provider.
- **Secure Payment Gateway:** Secure processing of payments.
- **Order Update:** Providers mark orders as complete.
- **Dispute Initiation:** Consumers can initiate disputes if needed.
- **Dispute Resolution Process:** Defined process for handling disputes.

  <img width="487" alt="use-case-diagram" src="https://github.com/user-attachments/assets/f2bf53cd-2b01-4357-8795-84b72b4ac16f">


**Non-Functional Requirements:**
- **Performance:** Fast and responsive platform handling user requests efficiently.
- **Security:** Robust measures to protect user data and financial information.
- **Scalability:** Ability to handle growing numbers of users and transactions.

### Feasibility Analysis

**Technical Feasibility:**
- **Technologies:** ReactJS, CSS for frontend; .NET and MS SQL for backend. Project is technically feasible.

**Operational Feasibility:**
- **Usability:** Simple UI/UX for easy operation and maintenance.

**Economical Feasibility:**
- **Cost:** Uses open-source technologies and affordable server costs, making it economically feasible.


## System Design

### Class Diagram
<img width="608" alt="class-diagram" src="https://github.com/user-attachments/assets/aaa5d70f-d6bf-4660-8cfb-c6fb33ae082c">


The class diagram represents the structure of the system, focusing on users, orders, and bids.

- **User Class:**
  - **Attributes:** User ID, Email, First Name, Password, Phone Number, Creation Date.
  - **Subclasses:**
    - **Consumer:** Can create orders.
    - **Provider:** Can be assigned orders. Additional attributes include Average Rating and Ratings Count.

- **Order Class:**
  - **Attributes:** Order ID, Name, Description, Cost Estimate.
  - **Association:** Linked with Consumer.

- **Bid Class:**
  - **Attributes:** Bid ID, Proposed Amount, Comment.
  - **Status:** Pending, Selected, or Rejected.

- **Order Status:** Transitions through Created, Processing, Completed, or Disputed states.

### Sequence Diagram
<img width="486" alt="sequence-diagram" src="https://github.com/user-attachments/assets/30f3c3e5-a2c2-43fa-ae1c-15d754fc6cdb">


The sequence diagram illustrates interactions among the following entities: Admin, Provider, Consumer, Platform, and Payment Gateway.

**Key Steps:**

1. **Order Creation:**
   - Consumer creates an order.
   - Platform confirms the order.

2. **Bidding:**
   - Providers submit bids for the order.
   - Bids are added to the order.

3. **Bid Selection:**
   - Consumer selects a bid.
   - The order status is updated accordingly.

4. **Payment Process:**
   - Payment request is initiated.
   - Payment Gateway creates a checkout session.
   - Upon payment confirmation, the bid selection is marked on the platform.

5. **Order Fulfillment:**
   - The order is fulfilled.
  
  ## Database Design

Database design involves structuring data for efficient storage and retrieval. It aims to minimize redundancy and ensure quick, flexible access for users.

**Key Aspects:**
- **Data Storage:** Organize data elements and structures identified during analysis to design the storage system.
- **Normalization:** Process to reduce data redundancy and ensure internal consistency, optimizing for minimal storage and data integrity.
- **Database Selection:** MS SQL is chosen for its robust support in developing and managing the database.

**Objectives:**
- **Efficiency:** Quick and efficient data access.
- **Flexibility:** Easy and adaptable database management.
- **Consistency:** Minimized data inconsistencies and optimized for updates.



## Algorithm: Weighted Scoring Recommendation System

A weighted scoring recommendation algorithm prioritizes items based on user-defined criteria:

1. **Identify Criteria:**
   - Determine factors like provider rating, bid amount, and provider age.

2. **Assign Weights:**
   - Assign numerical weights to each criterion based on its importance.

3. **Calculate Scores:**
   - Compute scores for each bid using the formula:
     
    <img width="487" alt="algorithm" src="https://github.com/user-attachments/assets/307acc06-462a-4fc2-9881-a512bfe489eb">


4. **Rank Items:**
   - Rank bids based on their scores, with higher scores indicating a better match.

5. **Recommend:**
   - Suggest the top-ranked bid to the user.

This algorithm provides personalized recommendations by weighing different criteria according to user preferences.


## Implementation and Testing

### 5.1 Implementation

The implementation phase involves transforming the conceptual design into a functional program using various tools. It follows an Incremental Development model, which allows iterative building and testing of smaller software segments, adapting to ongoing changes and delivering functional software more frequently.

### 5.1.1 Tools Used

- **ReactJS**
  - A JavaScript library for building user interfaces with reusable components, efficient DOM updates, and smooth UIs.

- **ASP.NET**
  - A web application framework by Microsoft for building scalable and secure server-side web applications.

- **CSS 3**
  - Used for styling web pages, defining design and layout variations for different devices. Basic syntax: `Selector {property: value}`.

- **MS SQL**
  - A relational database management system for organizing, storing, and retrieving structured data efficiently.

- **UML**
  - A visual language for software design, using diagrams to document and plan system architecture.

- **Visual Studio**
  - An Integrated Development Environment (IDE) offering features like code editing, syntax highlighting, and refactoring to support efficient code development.


## 5.2 Testing

### 5.2.1 Unit Testing
Each individual module was tested during the coding phase to ensure proper functionality. Errors found during unit testing were debugged. Some test cases include:

**Test Case 1: Consumer Login**
| S.N. | Test Inputs                          | Expected Output        | Actual Output      | Result          |
|------|--------------------------------------|------------------------|--------------------|-----------------|
| 1.   | email: abc@example.com, password: abc@123AA   | Login successful       | Login Success      | Test successful |
| 2.   | email: random@example.com, password: abc@123AA | Login unsuccessful     | Invalid credentials| Test successful |
| 3.   | email: abc@example, password: abc@123AA       | Login unsuccessful     | Email format invalid | Test successful |

**Test Case 2: Order Creation**
| S.N. | Test Inputs                                        | Expected Outcome | Actual Output  | Result          |
|------|----------------------------------------------------|------------------|----------------|-----------------|
| 1.   | Title: Build a composite deck in backyard, Description: 12x16 feet deck with railing, AllowedDays: 14, Cost: 6000 | Order should be created | Order created  | Test successful |
| 2.   | Title: , Description: 12x16 feet deck with railing, AllowedDays: 14, Cost: 6000 | Order creation failed | Title cannot be empty | Test successful |

### 5.2.2 System Testing
System testing was conducted after integration testing to ensure the entire system functions properly. The system was found to meet specifications and function correctly.

## Conclusion

This project successfully developed a secure and reliable online escrow platform. Key features such as secure payment processing, user identification, and data encryption were implemented to ensure smooth and secure transactions. The project also explored the evolving security landscape and identified new technologies to enhance platform security.

## References

[1] S. Marzieh, “Buyers' trust and mistrust in e-commerce platforms.” Information Systems and e-Business Management. November 2021.

[2] B. Daroch, G. Nagrath, “A study on factors limiting online shopping behaviour of consumers”. Rajagiri Management Journal. April 2021.

[3] A. Solomon, “Determinants of online escrow service adoption: An experimental study”. Decision Support Systems.

[4] A. Ali, S. Yukesh, T. Shankar, “Decentralised Escrow Protocol that Facilitates Secure Transactions between Trustless Parties”. Proceedings of the International Conference on Innovative Computing & Communication (ICICC). March 2023


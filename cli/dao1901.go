package main

import (
	"flag"
)

func main() {
	var (
		listMembers = flag.Bool("list-members", false, "list DAO1901 members")
		listVotes   = flag.Bool("list-votes", false, "list DAO1901 votes")
		voteResult  = flag.Int("vote-result", 0, "retrieve votes results")
	)
	flag.Parse()

	switch {
	case *listMembers:
	case *listVotes:
	case *voteResult > 0:
	}
}
